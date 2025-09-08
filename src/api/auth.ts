import { booksApi } from '@/api/http'
import type { Book } from '@/types/Book'
import { authApi } from '@/api/http'

export const AuthService = {
  async registerUser() {
    const response = await authApi.get('/api/v1/auth/register')
    return response.data
  },
}
