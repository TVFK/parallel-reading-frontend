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

  const fetchBooks = async () => {
    isLoading.value = true
    try {
      books.value = await BooksService.fetchBooks({
        title: router.currentRoute.value.query.title?.toString(),
        genres: router.currentRoute.value.query.genres?.toString(),
        level: router.currentRoute.value.query.level?.toString(),
        sort: router.currentRoute.value.query.sort?.toString(),
      })
    } catch (err) {
      error.value = 'Ошибка загрузки книг'
      console.error(err)
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
