import type { Genre } from './Genre'

export interface Book {
  id: number
  title: string
  author: string
  imageKey: string
  publishedYear: string
  level: string
  description: string
  numberOfPage: number
  genres: Genre[]
}
