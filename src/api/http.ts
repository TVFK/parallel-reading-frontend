import axios, { type AxiosInstance } from 'axios'

const BOOKS_API_URL = import.meta.env.VITE_BOOKS_API_URL || 'http://localhost:8080'
const TRANSLATION_URL = import.meta.env.VITE_API_TRANSLATION_URL || 'http://localhost:8081'

const createApiInstance = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

export const booksApi = createApiInstance(BOOKS_API_URL)
export const translationApi = createApiInstance(TRANSLATION_URL)
