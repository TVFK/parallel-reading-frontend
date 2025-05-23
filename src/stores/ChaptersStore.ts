import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'
import type { Chapter } from '@/types/Chapter'
import { ChaptersService } from '@/api/chapters'

export const useChaptersStore = defineStore('chaptersStore', () => {
  const chaptersCache = new Map<number, Chapter[]>()
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchChapters = async (bookId: number) => {
    loading.value = true
    try {
      const response = await ChaptersService.fetchChaptersByBookId(bookId)
      chaptersCache.set(bookId, response)
    } catch (err) {
      error.value = 'Ошибка при загрузке глав'
    } finally {
      loading.value = false
    }
  }

  const getChapters = (bookId: number) => chaptersCache.get(bookId) || []

  return {
    loading,
    error,
    fetchChapters,
    getChapters,
  }
})
