import type { Genre } from '@/types/Genre'
import { booksApi } from '@/api/http'

export const GenresService = {
  async fetchGenres(): Promise<Genre[]> {
    const response = await booksApi.get<Genre[]>('/genres')
    return response.data
  },
}
