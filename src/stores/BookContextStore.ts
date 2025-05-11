import type { Book } from '@/types/Book'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { BooksService } from '@/api/books'

export const useBookContextStore = defineStore('bookContextStore', () => {
  const currentBook = ref<Book | null>(null)

  const fetchBookByTitle = async (title: string) => {
    try {
      const response = await BooksService.fetchBookByTitle(title)
      currentBook.value = response
    } catch (err) {
      console.error('Произошла ошибка:', err)
    }
  }

  const setCurrentBook = (book: Book) => {
    currentBook.value = book
  }

  return {
    currentBook,
    fetchBookByTitle,
    setCurrentBook,
  }
})
