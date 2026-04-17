import { Link } from 'react-router-dom'
import PageTransition from '../components/ui/PageTransition'
import { ROUTES } from '../router/paths'

export default function NotFoundPage() {
    return (
        <PageTransition>
            <section className="glass-panel rounded-3xl p-8 text-center md:p-12">
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/80">404</p>
                <h2 className="text-display mt-2 text-4xl font-semibold text-white">Ruta no encontrada</h2>
                <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 md:text-base">
                    La pantalla que intentas abrir no existe en esta version del juego.
                </p>

                <Link
                    to={ROUTES.mainMenu}
                    className="mt-7 inline-flex rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                    Volver al menu
                </Link>
            </section>
        </PageTransition>
    )
}