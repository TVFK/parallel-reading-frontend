import type { Book } from '@/types/Book'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { BooksService } from '@/api/books'
import { AuthService } from '@/api/auth'
import type { RegistrationCredentials } from '@/types/RgistrationCredentials'

export const useAuthStore = defineStore('authStore', () => {
  const registerUser = async (registrationCred: RegistrationCredentials) => {
    try {
      const response = AuthService.registerUser()
    } catch (err) {
      console.error('Произошла ошибка:', err)
    }
  }

  return {
    registerUser,
  }
})
