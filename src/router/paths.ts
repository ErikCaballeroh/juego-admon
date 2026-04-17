export const ROUTES = {
    mainMenu: '/',
    profile: '/perfil',
    levelSelect: '/niveles',
    settings: '/configuracion',
    gameScene: '/juego/:levelId',
} as const

export function buildGameScenePath(levelId: string): string {
    return `/juego/${levelId}`
}