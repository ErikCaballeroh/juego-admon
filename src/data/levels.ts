import type { GameLevel } from '../types/game'

export const LEVELS = [
    {
        id: 'nivel-1',
        name: 'Nivel 1',
        description: 'Texto con descripcion',
        difficulty: 'Facil',
        estimatedMinutes: 6,
        isLocked: false,
    },
    {
        id: 'nivel-2',
        name: 'Nivel 2',
        description: 'Texto con descripcion',
        difficulty: 'Facil',
        estimatedMinutes: 6,
        isLocked: false,
    },
    {
        id: 'nivel-3',
        name: 'Nivel 3',
        description: 'Texto con descripcion',
        difficulty: 'Media',
        estimatedMinutes: 6,
        isLocked: false,
    },
    {
        id: 'nivel-4',
        name: 'Nivel 4',
        description: 'Texto con descripcion',
        difficulty: 'Media',
        estimatedMinutes: 6,
        isLocked: false,
    },
    {
        id: 'nivel-5',
        name: 'Nivel 5',
        description: 'Texto con descripcion',
        difficulty: 'Dificil',
        estimatedMinutes: 6,
        isLocked: false,
    },
] satisfies ReadonlyArray<GameLevel>