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

  // FIXME надо добавить список книг или как-то продумать это
  const getBookByTitle = (title: string) => booksCache.get(title)

  const fetchSortedBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/books/grouped-by-levels')
      sortedBooks.value = response.data
    } catch (err) {
      console.error('Произошла ошибка:', err)
    } finally {
    }
  }

  const fetchBookByTitle = async (title: string) => {
    if (booksCache.has(title)) return

    isLoading.value = true
    try {
      const response = await axios.get<Book>(`http://localhost:8080/books/${title}`)
      booksCache.set(title, response.data)
    } catch (err) {
      error.value = 'Ошибка при загрузке книги'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    getBookByTitle,
    sortedBooks,
    fetchSortedBooks,
    fetchBookByTitle,
  }
})
