import type { Book } from '@/types/Book'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBookContextStore = defineStore('bookContextStore', () => {
  const currentBook = ref<Book | null>(null)

  const fetchBookByTitle = async (title: String) => {
    try {
      const response = await axios.get(`http://localhost:8080/books/${title}`)
      currentBook.value = response.data
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
