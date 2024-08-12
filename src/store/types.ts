export interface AppState {
    baseUrl: string
    monthDiary: Diary[]
}

export interface Diary {
    date: Date
    content: string
    mood: string
    feeling: string
}