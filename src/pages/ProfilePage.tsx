import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import { ROUTES } from '../router/paths'

export default function ProfilePage() {
    return (
        <PageTransition className="p-5">
            <section className="glass-panel rounded-3xl p-8 md:p-10">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">Perfil</p>
                        <h2 className="text-display mt-2 text-3xl font-semibold text-white md:text-4xl">Tu perfil de jugador</h2>
                        <p className="mt-4 text-sm text-slate-300 md:text-base">
                            Pantalla base para progreso, logros, estadisticas y personalizacion.
                        </p>
                    </div>
                    <Link to={ROUTES.mainMenu} className="rounded-lg border border-cyan-100/30 bg-cyan-950/40 px-4 py-2 text-sm font-medium text-cyan-200 transition-colors hover:bg-cyan-900/60 whitespace-nowrap ml-4">
                        ← Atrás
                    </Link>
                </div>
            </section>
        </PageTransition>
    )
}
