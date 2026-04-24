import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js'

const BASE_ROTATION_X = Math.PI / 2

export interface UseGLBSceneOptions {
    modelUrl: string
    onZoneClick?: (moduleId: string) => void
    moduleStatus?: Record<string, boolean>
    zoneModuleMap?: Record<string, string>
    timerSeconds?: number
}

interface UseGLBSceneResult {
    mountRef: React.RefObject<HTMLDivElement | null>
    loading: boolean
    error: string | null
    resetRotation: () => void
}

function disposeObject(root: THREE.Object3D) {
    root.traverse((child) => {
        const mesh = child as THREE.Mesh
        if (!mesh.isMesh) return

        mesh.geometry.dispose()

        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
        materials.forEach((material) => {
            if (!material) return

            Object.values(material).forEach((value) => {
                if (value && typeof value === 'object' && 'isTexture' in value) {
                    ; (value as THREE.Texture).dispose()
                }
            })

            material.dispose()
        })
    })
}

const createTimerDisplay = (timeSeconds: number) => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256

    const ctx = canvas.getContext('2d')
    if (!ctx) return new THREE.Mesh()

    const drawTime = (secondsTotal: number) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#050308'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = '#ff8c42'
        ctx.lineWidth = 6
        if (typeof ctx.roundRect === 'function') {
            ctx.beginPath()
            ctx.roundRect(18, 18, canvas.width - 36, canvas.height - 36, 24)
            ctx.stroke()
        } else {
            ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36)
        }

        const minutes = Math.floor(secondsTotal / 60)
        const seconds = secondsTotal % 60
        const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

        ctx.font = 'bold 150px "Arial", system-ui, sans-serif'
        ctx.fillStyle = '#00ff4c'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'
        ctx.shadowBlur = 18
        ctx.fillText(timeStr, canvas.width / 2, canvas.height / 2)
    }

    drawTime(timeSeconds)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true

    const geometry = new THREE.PlaneGeometry(1.2, 0.4)
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        toneMapped: false,
    })
    const mesh = new THREE.Mesh(geometry, material)

    // Guardamos utilidades para actualizar sin recrear el mesh
    mesh.userData.timer = {
        canvas,
        ctx,
        texture,
        drawTime,
    }

    return mesh
}

export function useGLBScene({ 
    modelUrl, 
    onZoneClick, 
    moduleStatus = {}, 
    zoneModuleMap = {}, 
    timerSeconds = 0 
}: UseGLBSceneOptions): UseGLBSceneResult {
    const mountRef = useRef<HTMLDivElement>(null)
    const modelContainerRef = useRef<THREE.Group | null>(null)
    const timerMeshRef = useRef<THREE.Mesh | null>(null)
    const originalMaterialMapRef = useRef<Record<string, THREE.Material | THREE.Material[]>>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const resetRotation = useCallback(() => {
        if (!modelContainerRef.current) return
        modelContainerRef.current.rotation.set(BASE_ROTATION_X, 0, 0)
    }, [])

    useEffect(() => {
        const mount = mountRef.current
        if (!mount) return undefined

        let animationId = 0
        let isDragging = false
        let previousX = 0
        let previousY = 0

        setLoading(true)
        setError(null)

        const scene = new THREE.Scene()

        const camera = new THREE.PerspectiveCamera(
            55,
            mount.clientWidth / Math.max(mount.clientHeight, 1),
            0.1,
            100
        )
        camera.position.set(0, 0, 6.5)
        camera.lookAt(0, 0, 0)

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        })
        renderer.outputColorSpace = THREE.SRGBColorSpace
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        renderer.domElement.style.width = '100%'
        renderer.domElement.style.height = '100%'
        renderer.domElement.style.display = 'block'
        mount.appendChild(renderer.domElement)

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.95)
        const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
        const fillLight = new THREE.DirectionalLight(0x88caff, 0.6)
        keyLight.position.set(3, 4, 5)
        fillLight.position.set(-4, 2, 2)

        scene.add(ambientLight, keyLight, fillLight)

        const modelContainer = new THREE.Group()
        modelContainer.rotation.order = 'XZY'
        modelContainer.rotation.set(BASE_ROTATION_X, 0, 0)
        modelContainerRef.current = modelContainer
        scene.add(modelContainer)

        const loader = new GLTFLoader()
        loader.load(
            modelUrl,
            (gltf: GLTF) => {
                const model = gltf.scene

                const getModuleIdFromName = (name: string) => zoneModuleMap[name] || null
                const getModuleColor = (name: string) => {
                    const moduleId = getModuleIdFromName(name)
                    if (!moduleId || moduleStatus[moduleId] === undefined) return null
                    return moduleStatus[moduleId] ? new THREE.Color(0x00ff4c) : new THREE.Color(0xff2d2d)
                }

                model.traverse((child) => {
                    if (child instanceof THREE.Mesh && child.name) {
                        const moduleId = getModuleIdFromName(child.name)
                        if (moduleId) {
                            child.userData.interactiveId = moduleId
                            const newColor = getModuleColor(child.name)

                            if (child.material) {
                                // Save original material to clone later or modify
                                originalMaterialMapRef.current[child.uuid] = child.material
                                
                                // Modify current
                                child.material = (child.material as THREE.Material).clone()
                                child.material.userData.isCloned = true
                                if (newColor && 'color' in child.material) {
                                    (child.material as any).color.copy(newColor)
                                }
                            }
                        }
                    }
                })

                const timerMesh = createTimerDisplay(timerSeconds)
                // Posicionar relativo al modelo base. Quizás ajustar según bounding box.
                timerMesh.position.set(0, -1.0, 1.5) 
                model.add(timerMesh)
                timerMeshRef.current = timerMesh

                const box = new THREE.Box3().setFromObject(model)
                const center = box.getCenter(new THREE.Vector3())
                const size = box.getSize(new THREE.Vector3())
                const maxDimension = Math.max(size.x, size.y, size.z, 1)
                const scale = 4.4 / maxDimension

                model.scale.setScalar(scale)
                model.position.set(-center.x * scale, -center.y * scale, -center.z * scale)

                modelContainer.add(model)
                setLoading(false)
            },
            undefined,
            () => {
                setError('No se pudo cargar METNUM.glb')
                setLoading(false)
            }
        )

        const onMouseDown = (event: MouseEvent) => {
            if (event.button === 0) return // Solo interactuar para drag con boton derecho o izq arrastre
            isDragging = true
            previousX = event.clientX
            previousY = event.clientY
        }

        const onMouseMove = (event: MouseEvent) => {
            if (!isDragging || !modelContainerRef.current) return

            const deltaX = event.clientX - previousX
            const deltaY = event.clientY - previousY

            modelContainerRef.current.rotation.z -= deltaX * 0.01
            modelContainerRef.current.rotation.x += deltaY * 0.01
            modelContainerRef.current.rotation.y = 0

            previousX = event.clientX
            previousY = event.clientY
        }

        const onMouseUp = () => {
            isDragging = false
        }

        const raycaster = new THREE.Raycaster()
        const pointer = new THREE.Vector2()

        const onClick = (event: MouseEvent) => {
            if (event.button !== 0 || !onZoneClick || !modelContainerRef.current) return

            const rect = renderer.domElement.getBoundingClientRect()
            pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

            raycaster.setFromCamera(pointer, camera)

            const intersections = raycaster.intersectObjects(modelContainerRef.current.children, true)
            const hit = intersections.find((intersect) => intersect.object.userData.interactiveId)

            if (hit) {
                onZoneClick(hit.object.userData.interactiveId)
            }
        }

        const onWheel = (event: WheelEvent) => {
            event.preventDefault()
            camera.position.z = THREE.MathUtils.clamp(camera.position.z + event.deltaY * 0.01, 3, 12)
            camera.lookAt(0, 0, 0)
        }

        const onResize = () => {
            const width = mount.clientWidth
            const height = Math.max(mount.clientHeight, 1)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
            renderer.setSize(width, height)
        }

        const canvas = renderer.domElement
        canvas.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        canvas.addEventListener('click', onClick)
        canvas.addEventListener('wheel', onWheel, { passive: false })
        window.addEventListener('resize', onResize)

        const animate = () => {
            animationId = window.requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()

        return () => {
            window.cancelAnimationFrame(animationId)

            canvas.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
            canvas.removeEventListener('click', onClick)
            canvas.removeEventListener('wheel', onWheel)
            window.removeEventListener('resize', onResize)

            disposeObject(modelContainer)
            scene.remove(modelContainer)
            renderer.dispose()

            if (mount.contains(canvas)) {
                mount.removeChild(canvas)
            }
        }
    }, [modelUrl])

    // Update colors without reloading model
    const latestModuleStatus = useRef(moduleStatus)
    const latestZoneModuleMap = useRef(zoneModuleMap)
    
    useEffect(() => {
        latestModuleStatus.current = moduleStatus
        latestZoneModuleMap.current = zoneModuleMap
    }, [moduleStatus, zoneModuleMap])

    const latestOnZoneClick = useRef(onZoneClick)
    useEffect(() => {
        latestOnZoneClick.current = onZoneClick
    }, [onZoneClick])

    useEffect(() => {
        if (!modelContainerRef.current) return

        const getModuleIdFromName = (name: string) => zoneModuleMap[name] || null
        const getModuleColor = (name: string) => {
            const moduleId = getModuleIdFromName(name)
            if (!moduleId || moduleStatus[moduleId] === undefined) return null
            return moduleStatus[moduleId] ? new THREE.Color(0x00ff4c) : new THREE.Color(0xff2d2d)
        }

        modelContainerRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh && child.name) {
                const moduleId = getModuleIdFromName(child.name)
                if (moduleId) {
                    const newColor = getModuleColor(child.name)
                    if (newColor && child.material && 'color' in child.material) {
                        (child.material as any).color.copy(newColor)
                        child.material.needsUpdate = true
                    }
                }
            }
        })
    }, [moduleStatus, zoneModuleMap])

    useEffect(() => {
        if (!timerMeshRef.current) return
        const timerData = timerMeshRef.current.userData.timer
        if (!timerData) return

        timerData.drawTime(timerSeconds)
        timerData.texture.needsUpdate = true
    }, [timerSeconds])

    return {
        mountRef,
        loading,
        error,
        resetRotation,
    }
}