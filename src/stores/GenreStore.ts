import { GenresService } from '@/api/genres'
import type { Genre } from '@/types/Genre'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGenresStore = defineStore('genresStore', () => {
  const genres = ref<Genre[]>([])

  const fetchGenres = async () => {
    try {
      genres.value = await GenresService.fetchGenres()
    } catch (error) {
      console.error('Ошибка загрузки жанров:', error)
    }
  }
  return {
    genres,
    fetchGenres,
  }
})
