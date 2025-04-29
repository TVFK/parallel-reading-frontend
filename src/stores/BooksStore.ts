import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'
import type { Book } from '@/types/Book'
const levelsOrder = ['A1', 'A2', 'B1', 'B2', 'C1']

export const useBooksStore = defineStore('booksStore', () => {
  const booksCache = new Map<string, Book>()
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const sortedBooks = ref<Book[][]>([])

  const fetchSortedBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books/grouped-by-levels')
      sortedBooks.value = response.data
    } catch (err) {
      console.error('Произошла ошибка:', err)
    }
  }

  return {
    isLoading,
    error,
    sortedBooks,
    fetchSortedBooks,
  }
})
