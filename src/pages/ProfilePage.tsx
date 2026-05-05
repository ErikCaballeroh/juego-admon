import PageTransition from '../components/ui/PageTransition'

type TeamCreditItemProps = {
    name: string
    role?: string
}

function TeamCreditItem({ name, role }: TeamCreditItemProps) {
    return (
        <li className="rounded-3xl border border-cyan-400/20 bg-slate-950/70 p-5 text-left shadow-[0_10px_30px_rgba(15,23,42,0.35)]">
            <p className="text-lg font-semibold text-white">{name}</p>
            {role ? <p className="mt-1 text-sm text-slate-300">{role}</p> : null}
        </li>
    )
}

const TEAM_MEMBERS = [
    { name: 'Diego Bizzarri', role: 'Scrum Master' },
    { name: 'Erik Caballero', role: 'Desarrollador' },
    { name: 'Andrea Escalante', role: 'Desarrolladora' },
    { name: 'Erik Rivera José', role: 'Desarrollador' },
    { name: 'José Roberto', role: 'Desarrollador' },
    { name: 'Jonathan García', role: 'Desarrollador' },
    { name: 'JJosé Guerrero ', role: 'Desarrollador' },
]

export default function ProfilePage() {
    return (
        <PageTransition className="p-5">
            <section className="glass-panel rounded-3xl p-8 md:p-10">
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-200/80">Créditos</p>
                <h2 className="text-display mt-2 text-3xl font-semibold text-white md:text-4xl">Equipo 6 de Scrum</h2>
                <p className="mt-4 max-w-2xl text-sm text-slate-300 md:text-base">
                    Esta pantalla presenta los integrantes del Equipo 6 de Scrum responsables del desarrollo de esta experiencia.
                </p>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {TEAM_MEMBERS.map((member) => (
                        <TeamCreditItem key={member.name} name={member.name} role={member.role} />
                    ))}
                </ul>
            </section>
        </PageTransition>
    )
}
