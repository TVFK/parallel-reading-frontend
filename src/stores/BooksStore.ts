import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Book } from '@/types/Book'
import { BooksService } from '@/api/books'
import { useRouter } from 'vue-router'
const levelsOrder = ['A1', 'A2', 'B1', 'B2', 'C1']

export const useBooksStore = defineStore('booksStore', () => {
  const books = ref<Book[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const sortedBooks = ref<Book[][]>([])
  const router = useRouter()

  const fetchSortedBooks = async () => {
    try {
      const books = await BooksService.fetchSortedBooks()
      sortedBooks.value = books
    } catch (err) {
      console.error('Произошла ошибка:', err)
    }
  }

  const fetchBooks = async (params: {
    title?: string
    genres?: string
    level?: string
    sort?: string
  }) => {
    isLoading.value = true
    try {
      books.value = await BooksService.fetchBooks(params)
    } catch (err) {
      error.value = 'Ошибка загрузки'
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    sortedBooks,
    books,
    fetchSortedBooks,
    fetchBooks,
  }
})
