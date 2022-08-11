export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
export type Visibility = 'great' | 'good' | 'ok' | 'poor'

export interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

export interface ProductEntry {
  id: number
  name: string
  price: number
  description: string
}

export interface UserEntry {
  id: number
  username: string
  name: string
  passwordHash: string
}

export type NewProductEntry = Omit<ProductEntry, 'id'>

export type NewUserEntry = Omit<UserEntry, 'id'>
// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>
export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
