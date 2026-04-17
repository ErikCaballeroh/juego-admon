export type Difficulty = 'Facil' | 'Media' | 'Dificil'

export interface GameLevel {
    id: string
    name: string
    description: string
    difficulty: Difficulty
    estimatedMinutes: number
    isLocked: boolean
}