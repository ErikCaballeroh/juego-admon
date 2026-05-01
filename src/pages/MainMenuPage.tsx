import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/ui/PageTransition'
import { ROUTES } from '../router/paths'

function ProfileIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-9 w-9 md:h-12 md:w-12" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
            <path d="M5 20c0-3.2 3-5.5 7-5.5s7 2.3 7 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

function PlayIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-9 w-9 md:h-12 md:w-12" fill="currentColor" aria-hidden="true">
            <path d="M8 5.2c0-1 1.1-1.6 2-1l8.6 6.1c.8.6.8 1.8 0 2.4L10 18.8c-.9.6-2 .1-2-1V5.2z" />
        </svg>
    )
}

function SettingsIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-9 w-9 md:h-12 md:w-12" fill="currentColor" aria-hidden="true">
            <path
                d="M19.14 12.94a7.43 7.43 0 00.05-.94 7.43 7.43 0 00-.05-.94l2.11-1.65a.48.48 0 00.11-.61l-2-3.46a.5.5 0 00-.6-.22l-2.49 1a7.28 7.28 0 00-1.63-.94l-.38-2.65A.49.49 0 0013.77 2h-3.54a.49.49 0 00-.49.42l-.38 2.65a7.28 7.28 0 00-1.63.94l-2.49-1a.5.5 0 00-.6.22l-2 3.46a.48.48 0 00.11.61l2.11 1.65a7.43 7.43 0 00-.05.94 7.43 7.43 0 00.05.94l-2.11 1.65a.48.48 0 00-.11.61l2 3.46a.5.5 0 00.6.22l2.49-1a7.28 7.28 0 001.63.94l.38 2.65a.49.49 0 00.49.42h3.54a.49.49 0 00.49-.42l.38-2.65a7.28 7.28 0 001.63-.94l2.49 1a.5.5 0 00.6-.22l2-3.46a.48.48 0 00-.11-.61z"
            />
            <circle cx="12" cy="12" r="3.1" fill="rgb(125 211 252)" />
        </svg>
    )
}

function StudyIcon() {
    return (
        <svg viewBox="0 0 24 24" className="h-9 w-9 md:h-12 md:w-12" fill="currentColor" aria-hidden="true">
            <path d="M3 6.5C3 5.7 3.7 5 4.5 5h15c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5h-15A1.5 1.5 0 013 17.5v-11zM5 8v8h14V8H5zm2 2h10v2H7v-2z" />
        </svg>
    )
}

export default function MainMenuPage() {
    return (
        <PageTransition className="min-h-screen">
            <section className="relative flex min-h-screen items-center justify-center px-4 py-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(56,189,248,0.2),transparent_46%)]" />

                <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 text-center md:gap-16">
                    <h2 className="text-display whitespace-nowrap text-[clamp(2.2rem,9vw,7.8rem)] leading-none font-bold text-white drop-shadow-[0_8px_0_rgba(7,89,133,0.75)]">
                        Desactivación Crítica
                    </h2>

                    <div className="flex w-full items-center justify-center gap-5 md:gap-10">
                        <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                to={ROUTES.profile}
                                className="inline-flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-cyan-100/70 bg-sky-300 p-2 text-slate-950 shadow-[0_8px_0_rgba(3,105,161,0.7)] transition hover:bg-sky-200 md:h-30 md:w-30"
                                aria-label="Ir a perfil"
                            >
                                <ProfileIcon />
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                to={ROUTES.levelSelect}
                                className="inline-flex h-28 min-w-52 items-center justify-center gap-4 rounded-3xl border-2 border-cyan-100/70 bg-amber-300 px-9 text-2xl font-extrabold text-slate-950 shadow-[0_10px_0_rgba(180,83,9,0.75)] transition hover:bg-amber-200 md:h-36 md:min-w-72 md:text-3xl"
                                aria-label="Ir a niveles"
                            >
                                <PlayIcon />
                                JUGAR
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                to={ROUTES.studyGuide}
                                className="inline-flex h-28 min-w-52 items-center justify-center gap-4 rounded-3xl border-2 border-cyan-100/70 bg-teal-300 px-6 text-xl font-bold text-slate-950 shadow-[0_10px_0_rgba(6,95,70,0.75)] transition hover:bg-teal-200 md:h-36 md:min-w-72 md:text-2xl"
                                aria-label="Ir a guía de estudio"
                            >
                                <StudyIcon />
                                GUÍA
                            </Link>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                to={ROUTES.settings}
                                className="inline-flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-cyan-100/70 bg-sky-300 p-2 text-slate-950 shadow-[0_8px_0_rgba(3,105,161,0.7)] transition hover:bg-sky-200 md:h-30 md:w-30"
                                aria-label="Ir a configuracion"
                            >
                                <SettingsIcon />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </PageTransition>
    )
}