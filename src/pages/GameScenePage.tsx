import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import { LEVELS } from '../data/levels'
import { useGLBScene } from '../hooks/useGLBScene'
import { ROUTES } from '../router/paths'
import metnumModelUrl from '../assets/METNUM.glb?url'

const HUD_TIMER_INITIAL_SECONDS = 5 * 60

const ZONE_MODULE_MAP: Record<string, string> = {
    // IMPORTANTE: Ajusta estas llaves a los nombres reales de los meshes en tu archivo GLB
    'MODULO1': 'q1',
    'MODULO2': 'q2',
    'MODULO3': 'q3',
    'MODULO4': 'q4',
}

const QUESTIONS: Record<string, { text: string; options: string[]; correctIndex: number }> = {
    q1: {
        text: '¿Cuál es el propósito principal de los métodos numéricos?',
        options: [
            'Resolver problemas matemáticos exactos',
            'Encontrar aproximaciones a problemas matemáticos complejos',
            'Programar sistemas operativos',
            'Diseñar interfaces de usuario'
        ],
        correctIndex: 1,
    },
    q2: {
        text: '¿Qué es el error de truncamiento?',
        options: [
            'El error causado por representar números en coma flotante',
            'El error de usar fórmulas simplificadas en lugar de exactas',
            'El error provocado por el hardware',
            'Un error de sintaxis en el código'
        ],
        correctIndex: 1,
    },
    q3: {
        text: '¿Cúal es una característica del método de bisección?',
        options: [
            'Es un método abierto',
            'Siempre converge si la función cambia de signo en el intervalo',
            'Es el método más rápido',
            'Requiere el cálculo de la derivada'
        ],
        correctIndex: 1,
    },
    q4: {
        text: '¿Qué método usa derivadas para encontrar raíces reales?',
        options: [
            'Método de Newton-Raphson',
            'Método de la regla falsa',
            'Método de la secante',
            'Método de Bairstow'
        ],
        correctIndex: 0,
    },
}

export default function GameScenePage() {
    const { levelId } = useParams<{ levelId: string }>()
    const [remainingSeconds, setRemainingSeconds] = useState(HUD_TIMER_INITIAL_SECONDS)
    const [activeModuleId, setActiveModuleId] = useState<string | null>(null)
    const [moduleStatus, setModuleStatus] = useState<Record<string, boolean>>({
        q1: false,
        q2: false,
        q3: false,
        q4: false,
    })
    const [selectedAnswer, setSelectedAnswer] = useState<{ index: number, isCorrect: boolean } | null>(null)

    const handleZoneClick = (moduleId: string) => {
        // No abrir si ya fue resuelto
        if (moduleStatus[moduleId]) return
        setActiveModuleId(moduleId)
        setSelectedAnswer(null) // Reset al abrir
    }

    const { mountRef, loading, error, resetRotation } = useGLBScene({
        modelUrl: metnumModelUrl,
        onZoneClick: handleZoneClick,
        moduleStatus,
        timerSeconds: remainingSeconds,
        zoneModuleMap: ZONE_MODULE_MAP
    })

    const level = LEVELS.find((currentLevel) => currentLevel.id === levelId)

    useEffect(() => {
        setRemainingSeconds(HUD_TIMER_INITIAL_SECONDS)
    }, [levelId])

    useEffect(() => {
        if (remainingSeconds <= 0) return undefined

        const intervalId = window.setInterval(() => {
            setRemainingSeconds((prevSeconds) => (prevSeconds <= 1 ? 0 : prevSeconds - 1))
        }, 1000)

        return () => {
            window.clearInterval(intervalId)
        }
    }, [remainingSeconds])

    const timerLabel = useMemo(() => {
        const minutes = Math.floor(remainingSeconds / 60)
        const seconds = remainingSeconds % 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }, [remainingSeconds])

    const handleAnswerClick = (optionIndex: number) => {
        if (!activeModuleId || selectedAnswer !== null) return
        
        // Reproducir sonido
        try {
            const cutSound = new Audio('/cut.mp3')
            cutSound.volume = 0.6
            const playPromise = cutSound.play()
            if (playPromise !== undefined) {
                playPromise.catch(() => console.log('El audio requirió interacción previa o no se encontró'))
            }
        } catch (e) {
            console.error('Audio api fallback', e)
        }
        
        const question = QUESTIONS[activeModuleId]
        const isCorrect = optionIndex === question.correctIndex
        
        setSelectedAnswer({ index: optionIndex, isCorrect })
        
        setTimeout(() => {
            if (isCorrect) {
                setModuleStatus((prev) => ({ ...prev, [activeModuleId]: true }))
            } else {
                setRemainingSeconds((prev) => Math.max(0, prev - 30))
            }
            setActiveModuleId(null)
            setSelectedAnswer(null)
        }, 1500)
    }

    if (!level) {
        return <Navigate to={ROUTES.levelSelect} replace />
    }

    const activeQuestion = activeModuleId ? QUESTIONS[activeModuleId] : null

    const CABLE_COLORS = [
        { name: 'Rojo', from: 'from-red-600', to: 'to-red-700', border: 'border-red-900', bg: 'bg-red-500' },
        { name: 'Azul', from: 'from-blue-600', to: 'to-blue-700', border: 'border-blue-900', bg: 'bg-blue-500' },
        { name: 'Verde', from: 'from-green-500', to: 'to-green-600', border: 'border-green-900', bg: 'bg-green-400' },
        { name: 'Amarillo', from: 'from-yellow-400', to: 'to-yellow-600', border: 'border-yellow-700', bg: 'bg-yellow-400' },
    ]

    return (
        <PageTransition className="h-svh overflow-hidden p-5">
            <section
                className="grid h-[calc(100svh-2.5rem)] min-h-0 gap-5 grid-cols-[minmax(0,2fr)_minmax(240px,1fr)] relative select-none"
                onContextMenu={(e) => e.preventDefault()}
            >
                <motion.div
                    className="glass-panel relative h-full min-h-0 overflow-hidden rounded-3xl"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div ref={mountRef} className="absolute inset-0" />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/20 via-transparent to-transparent" />

                    {loading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/35 text-sm font-semibold text-cyan-100">
                            Cargando modelo METNUM...
                        </div>
                    )}

                    {error && (
                        <div className="absolute inset-x-4 top-4 z-20 rounded-xl border border-rose-300/50 bg-rose-950/60 px-4 py-3 text-sm text-rose-100">
                            {error}
                        </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3">
                        <p className="rounded-lg border border-cyan-100/30 bg-slate-900/55 px-3 py-1.5 text-xs text-cyan-100/90 md:text-sm">
                            Arrastra para rotar, rueda para zoom, click izq en los módulos rojos para resolver
                        </p>
                        <button
                            type="button"
                            onClick={resetRotation}
                            className="rounded-lg border border-cyan-100/30 bg-cyan-300/85 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200 md:text-sm"
                        >
                            Reiniciar vista
                        </button>
                    </div>

                    {/* Modal de la pregunta */}
                    <AnimatePresence>
                        {activeQuestion && (
                            <motion.div
                                className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur-sm"
                                style={{ cursor: "url(/pinzas.png) 64 0, crosshair" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="w-full max-w-lg rounded-2xl border border-cyan-400/30 bg-slate-900/95 p-6 shadow-2xl shadow-cyan-900/20"
                                    initial={{ scale: 0.9, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.9, y: 20 }}
                                >
                                    <h3 className="mb-6 text-xl font-medium text-white">{activeQuestion.text}</h3>
                                    <div className="flex flex-col gap-4">
                                        {activeQuestion.options.map((option, index) => {
                                            const color = CABLE_COLORS[index % CABLE_COLORS.length]
                                            const isSelected = selectedAnswer?.index === index
                                            
                                            // Visual feedback de estado
                                            let cableVisual = `bg-linear-to-b ${color.from} ${color.to} ${color.border}`
                                            if (selectedAnswer !== null) {
                                                if (isSelected) {
                                                    cableVisual = selectedAnswer.isCorrect ? 'bg-green-500 border-green-700' : 'bg-red-600 border-red-800'
                                                } else {
                                                    cableVisual = 'bg-slate-700 border-slate-800 opacity-50 grayscale'
                                                }
                                            }

                                            return (
                                                <div key={index} className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800/40 p-3 shadow-inner">
                                                    <button
                                                        onClick={() => handleAnswerClick(index)}
                                                        disabled={selectedAnswer !== null}
                                                        className={`group relative h-8 w-40 shrink-0 overflow-hidden rounded-md border-b-4 border-r-2 shadow-md transition-transform ${selectedAnswer !== null ? '' : 'hover:-translate-y-0.5 hover:scale-105 active:translate-y-0 active:scale-95'} ${cableVisual}`}
                                                        style={{ cursor: selectedAnswer !== null ? 'default' : "url(/pinzas.png) 64 0, pointer" }}
                                                        title={`Cortar cable ${color.name}`}
                                                    >
                                                        {/* Línea de "corte" en medio del cable */}
                                                        <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 transition-all duration-300 ${isSelected ? 'w-2 bg-black/80' : 'w-0.5 bg-black/30 group-hover:w-1 group-hover:bg-white/40'}`} />
                                                        {/* Reflejo estilo cilíndrico */}
                                                        <div className="absolute inset-x-0 top-0 h-1/3 bg-white/20" />
                                                    </button>
                                                    <span className="flex-1 text-sm font-medium text-slate-200">{option}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    
                                    {selectedAnswer !== null && (
                                        <div className={`mt-6 rounded-lg p-3 text-center font-bold animate-pulse ${selectedAnswer.isCorrect ? 'bg-green-950/50 text-green-400' : 'bg-red-950/50 text-red-400'}`}>
                                            {selectedAnswer.isCorrect ? '✓ ¡Cable correcto! Módulo desactivado.' : '✗ ¡Cable incorrecto! -30 segundos de penalización.'}
                                        </div>
                                    )}

                                    <button
                                        onClick={() => { setActiveModuleId(null); setSelectedAnswer(null); }}
                                        disabled={selectedAnswer !== null}
                                        className={`mt-6 w-full rounded-xl bg-slate-800 py-3 text-sm font-semibold text-slate-400 transition hover:bg-slate-700 hover:text-white ${selectedAnswer !== null ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                                    >
                                        Cancelar
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.div>

                <aside className="glass-panel flex h-full min-h-0 flex-col rounded-3xl p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Escena del juego</p>
                    <h2 className="text-display mt-2 text-2xl font-semibold text-white">{level.name}</h2>
                    <p className="mt-3 text-sm text-slate-300">{level.description}</p>

                    <h3 className="text-display mt-6 text-xl font-semibold text-white">HUD inicial</h3>

                    <div className="mt-4 space-y-3 text-sm text-slate-300">
                        <div className="rounded-xl border border-cyan-100/30 bg-slate-950/45 px-4 py-3">
                            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/70">Timer</p>
                            <p className="text-display mt-1 text-3xl font-bold text-cyan-100">{timerLabel}</p>
                            <p className="mt-1 text-xs text-slate-300/90">
                                {remainingSeconds === 0 ? 'Tiempo agotado' : 'La bomba explotara al finalizar la cuenta regresiva'}
                            </p>
                        </div>
                        <p>Tiempo objetivo: {level.estimatedMinutes} min</p>
                        <p>Dificultad: {level.difficulty}</p>
                        <p>Estado: En desarrollo</p>
                        <p>Módulos desactivados: {Object.values(moduleStatus).filter(Boolean).length} / {Object.keys(moduleStatus).length}</p>
                    </div>

                    <div className="mt-auto rounded-xl border border-cyan-100/20 bg-cyan-950/30 p-4 text-sm text-cyan-100/85">
                        Resuelve los incisos cliqueando las partes de la bomba marcadas en rojo. Se volverán verdes al acertar.
                    </div>
                </aside>
            </section>
        </PageTransition>
    )
}