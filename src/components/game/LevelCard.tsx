import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { buildGameScenePath } from '../../router/paths'
import type { Difficulty, GameLevel } from '../../types/game'

interface LevelCardProps {
    level: GameLevel
}

const difficultyClasses: Record<Difficulty, string> = {
    Facil: 'bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-300/40',
    Media: 'bg-amber-400/20 text-amber-200 ring-1 ring-amber-300/40',
    Dificil: 'bg-rose-400/20 text-rose-200 ring-1 ring-rose-300/40',
}

export default function LevelCard({ level }: LevelCardProps) {
    return (
        <motion.article
            className="glass-panel flex h-full flex-col gap-4 rounded-2xl p-5"
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-display text-xl font-semibold text-white">{level.name}</h3>
                    <p className="mt-1 text-sm text-cyan-100/70">{level.description}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyClasses[level.difficulty]}`}>
                    {level.difficulty}
                </span>
            </div>

            <div className="mt-auto flex items-center justify-between">
                <p className="text-sm text-slate-300">Duracion estimada: {level.estimatedMinutes} min</p>

                {level.isLocked ? (
                    <span className="rounded-lg border border-cyan-100/20 px-4 py-2 text-sm text-slate-300">
                        Bloqueado
                    </span>
                ) : (
                    <Link
                        to={buildGameScenePath(level.id)}
                        className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                        Jugar nivel
                    </Link>
                )}
            </div>
        </motion.article>
    )
}