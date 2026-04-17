import { Outlet } from 'react-router-dom'

export default function GameShellLayout() {
    return (
        <div className="relative min-h-screen overflow-x-hidden">
            <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-40" />

            <main className="min-h-screen">
                <Outlet />
            </main>
        </div>
    )
}