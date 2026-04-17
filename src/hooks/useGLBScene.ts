import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader, type GLTF } from 'three/addons/loaders/GLTFLoader.js'

const BASE_ROTATION_X = Math.PI / 2

interface UseGLBSceneOptions {
    modelUrl: string
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

export function useGLBScene({ modelUrl }: UseGLBSceneOptions): UseGLBSceneResult {
    const mountRef = useRef<HTMLDivElement>(null)
    const modelContainerRef = useRef<THREE.Group | null>(null)
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

    return {
        mountRef,
        loading,
        error,
        resetRotation,
    }
}