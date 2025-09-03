import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Page } from '@/types/Page'
import { PagesService } from '@/api/pages'
import { useRouter } from 'vue-router'

export const usePagesStore = defineStore('pagesStore', () => {
  const currentPage = ref<Page>()
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const router = useRouter()

  const fetchPageByBookId = async (
    bookId: number,
    pageNumber?: number,
  ): Promise<Page | undefined> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await PagesService.fetchPageByBookId(bookId, pageNumber)
      if (!response) {
        throw new Error('Страница не найдена')
      }
      currentPage.value = response
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка загрузки страницы'
      return undefined
    } finally {
      isLoading.value = false
    }
  }

  const fetchFirstPageOfChapter = async (chapterId: number) => {
    isLoading.value = true
    error.value = null

    const page = await PagesService.fetchFirstPageOfChapter(chapterId)

    if (!page) {
      throw new Error('Страница не найдена')
    }

    currentPage.value = page
    router.push({ query: { pageNumber: page.pageNumber } })
  }

  const navigatePage = async (action: 'next' | 'prev') => {
    isLoading.value = true
    error.value = null

    try {
      const pageId = currentPage.value?.id
      if (!pageId) throw new Error('Текущая страница не определена')

      const page =
        action === 'next'
          ? await PagesService.nextPage(pageId)
          : await PagesService.prevPage(pageId)

      if (!page) throw new Error('Страница не найдена')

      currentPage.value = page
      router.push({ query: { pageNumber: page.pageNumber } })
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Ошибка навигации'
      console.error(`Ошибка при загрузке ${action} страницы:`, err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    currentPage,
    isLoading,
    error,
    fetchPageByBookId,
    fetchFirstPageOfChapter,
    navigatePage,
  }
})
