export type Difficulty = 'Facil' | 'Media' | 'Dificil'

export interface Question {
    text: string
    options: string[]
    correctIndex: number
}

export interface GameLevel {
    id: string
    name: string
    description: string
    difficulty: Difficulty
    estimatedMinutes: number
    isLocked: boolean
    questions?: Record<string, Question>
}