import PageTransition from '../components/ui/PageTransition'

export default function SettingsPage() {
    return (
        <PageTransition className='p-5'>
            <section className="glass-panel rounded-3xl p-8 md:p-10">
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">Configuración</p>
                <h2 className="text-display mt-2 text-3xl font-semibold text-white md:text-4xl">Ajustes del juego</h2>
                <p className="mt-4 text-sm text-slate-300 md:text-base">
                    Pantalla base para audio, controles, idioma y opciones visuales.
                </p>
            </section>
        </PageTransition>
    )
}