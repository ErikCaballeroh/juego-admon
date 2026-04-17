import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import { LEVELS } from '../data/levels'
import { useGLBScene } from '../hooks/useGLBScene'
import { ROUTES } from '../router/paths'
import metnumModelUrl from '../assets/METNUM.glb?url'

const HUD_TIMER_INITIAL_SECONDS = 5 * 60

export default function GameScenePage() {
    const { levelId } = useParams<{ levelId: string }>()
    const { mountRef, loading, error, resetRotation } = useGLBScene({ modelUrl: metnumModelUrl })
    const [remainingSeconds, setRemainingSeconds] = useState(HUD_TIMER_INITIAL_SECONDS)

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

    if (!level) {
        return <Navigate to={ROUTES.levelSelect} replace />
    }

    return (
        <PageTransition className="h-svh overflow-hidden p-5">
            <section className="grid h-[calc(100svh-2.5rem)] min-h-0 gap-5 grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
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
                            Arrastra para rotar, rueda para zoom
                        </p>
                        <button
                            type="button"
                            onClick={resetRotation}
                            className="rounded-lg border border-cyan-100/30 bg-cyan-300/85 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-200 md:text-sm"
                        >
                            Reiniciar vista
                        </button>
                    </div>
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
                    </div>

                    <div className="mt-auto rounded-xl border border-cyan-100/20 bg-cyan-950/30 p-4 text-sm text-cyan-100/85">
                        Info
                    </div>
                </aside>
            </section>
        </PageTransition>
    )
}