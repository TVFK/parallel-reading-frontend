// src/api/services/pages.api.ts
import { booksApi } from '@/api/http'
import type { Page } from '@/types/Page'

export const PagesService = {
  async fetchPage(bookTitle: string, pageNumber?: number): Promise<Page> {
    const response = await booksApi.get<Page>(`/read/books/${bookTitle}`, {
      params: { pageNumber },
    })
    return response.data
  },

  async fetchPageByBookId(bookId: number, pageNumber?: number): Promise<Page> {
    const response = await booksApi.get<Page>(`/read/books/${bookId}`, {
      params: { pageNumber },
    })
    return response.data
  },

  async nextPage(currentPageId: number): Promise<Page> {
    const response = await booksApi.get<Page>('/read/next', {
      params: { pageId: currentPageId },
    })
    return response.data
  },

  async prevPage(currentPageId: number): Promise<Page> {
    const response = await booksApi.get<Page>('/read/prev', {
      params: { pageId: currentPageId },
    })
    return response.data
  },
}
