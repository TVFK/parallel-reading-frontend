import type { Sentence } from './Sentence'

export interface Page {
  id: number
  chapterId: number
  pageNumber: number
  sentences: Sentence[]
}
