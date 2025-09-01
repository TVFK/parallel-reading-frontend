import { booksApi } from '@/api/http'
import type { Book } from '@/types/Book'

export const BooksService = {
  async fetchSortedBooks(): Promise<Book[][]> {
    console.log(booksApi.getUri())
    const response = await booksApi.get<Book[][]>('/books/grouped-by-levels')
    return response.data
  },

  async fetchBookByTitle(bookTitle: string): Promise<Book> {
    const response = await booksApi.get<Book>(`/books/by-title/${bookTitle}`)
    return response.data
  },

  async fetchBooks(params: {
    title?: string
    genres?: string | string[]
    level?: string
    sort?: string
  }): Promise<Book[]> {
    const response = await booksApi.get<Book[]>('/books', { params })
    return response.data
  },
}
