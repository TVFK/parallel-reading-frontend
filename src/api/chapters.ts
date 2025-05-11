import type { Chapter } from '@/types/Chapter'
import { booksApi } from '@/api/http'

export const ChaptersService = {
  async fetchChaptersByBookId(bookId: number): Promise<Chapter[]> {
    const response = await booksApi.get<Chapter[]>(`/books/${bookId}/chapters`)
    return response.data
  },
}
