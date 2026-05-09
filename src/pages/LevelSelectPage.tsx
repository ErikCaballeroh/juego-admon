import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LevelCard from '../components/game/LevelCard'
import PageTransition from '../components/ui/PageTransition'
import { LEVELS } from '../data/levels'
import { ROUTES } from '../router/paths'

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
}

export default function LevelSelectPage() {
    return (
        <PageTransition className="space-y-6 p-5">
            <section className="glass-panel rounded-2xl p-5 md:p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">Seleccion de niveles</p>
                        <h2 className="text-display mt-2 text-3xl font-semibold text-white">Elige tu proxima bomba</h2>
                        <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                            Cada nivel muestra contenido diferente para desactivar las bombas
                        </p>
                    </div>
                    <Link to={ROUTES.mainMenu} className="rounded-lg border border-cyan-100/30 bg-cyan-950/40 px-4 py-2 text-sm font-medium text-cyan-200 transition-colors hover:bg-cyan-900/60 whitespace-nowrap ml-4">
                        ← Atrás
                    </Link>
                </div>
            </section>

            <motion.ul
                className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                variants={listVariants}
                initial="hidden"
                animate="visible"
            >
                {LEVELS.map((level) => (
                    <motion.li key={level.id} variants={itemVariants}>
                        <LevelCard level={level} />
                    </motion.li>
                ))}
            </motion.ul>
        </PageTransition>
    )
}