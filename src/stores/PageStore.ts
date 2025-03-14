import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import type { Page } from '@/types/Page'

export const usePagesStore = defineStore('pagesStore', () => {
  const currentPage = ref<Page>()
  const pageCache = new Map<string, Page>()
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchPage = async (bookTitle: string, pageNumber?: number) => {
    const cacheKey = `${bookTitle}-${pageNumber}`
    if (pageCache.has(cacheKey)) return

    isLoading.value = true
    try {
      const response = await axios.get<Page>(`http://localhost:8080/read/books/${bookTitle}`, {
        params: { pageNumber },
      })
      currentPage.value = response.data
      pageCache.set(cacheKey, response.data)
    } catch (err) {
      error.value = 'Ошибка при загрузке страницы'
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentPage,
    isLoading,
    error,
    fetchPage,
  }
})
