import type { Genre } from './Genre'

export interface Book {
  id: number
  title: string
  author: string
  image: string
  publisherDate: string
  level: string
  description: string
  numberOfPage: number
  genres: Genre[]
}
