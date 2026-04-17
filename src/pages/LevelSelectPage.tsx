import { motion } from 'framer-motion'
import LevelCard from '../components/game/LevelCard'
import PageTransition from '../components/ui/PageTransition'
import { LEVELS } from '../data/levels'

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
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">Seleccion de niveles</p>
                <h2 className="text-display mt-2 text-3xl font-semibold text-white">Elige tu proxima bomba</h2>
                <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                    Cada nivel muestra contenido diferente para desactivar las bombas
                </p>
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