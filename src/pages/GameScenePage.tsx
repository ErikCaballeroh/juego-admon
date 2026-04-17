import { motion } from 'framer-motion'
import { Navigate, useParams } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import { LEVELS } from '../data/levels'
import { ROUTES } from '../router/paths'

export default function GameScenePage() {
    const { levelId } = useParams<{ levelId: string }>()

    const level = LEVELS.find((currentLevel) => currentLevel.id === levelId)

    if (!level) {
        return <Navigate to={ROUTES.levelSelect} replace />
    }

    return (
        <PageTransition className="space-y-6 p-5">
            <header className="glass-panel rounded-2xl p-5 md:p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Escena del juego</p>
                <h2 className="text-display mt-2 text-3xl font-semibold text-white">{level.name}</h2>
                <p className="mt-3 text-sm text-slate-300 md:text-base">{level.description}</p>
            </header>

            <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <motion.div
                    className="glass-panel relative min-h-90 overflow-hidden rounded-3xl p-6"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="absolute inset-4 rounded-2xl border border-dashed border-cyan-200/40" />

                    <div className="relative z-10 flex h-full items-center justify-center text-center">
                        <div>
                            <h3 className="text-display text-2xl font-semibold text-white">Canvas de juego vacio</h3>
                            <p className="mx-auto mt-3 max-w-md text-sm text-slate-300 md:text-base">
                                Montar render, fisicas, entidades y ciclo principal del juego.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <aside className="glass-panel rounded-3xl p-5">
                    <h3 className="text-display text-xl font-semibold text-white">HUD inicial</h3>

                    <div className="mt-4 space-y-3 text-sm text-slate-300">
                        <p>Tiempo objetivo: {level.estimatedMinutes} min</p>
                        <p>Dificultad: {level.difficulty}</p>
                        <p>Estado: En desarrollo</p>
                    </div>
                </aside>
            </section>
        </PageTransition>
    )
}