import axios, { type AxiosInstance } from 'axios'

const BASE_URL_1 = import.meta.env.VITE_BOOKS_API_URL || 'http://localhost:8080'
const BASE_URL_2 = import.meta.env.VITE_API_TRANSLATION_URL || 'http://localhost:8081'

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

export const booksApi = createApiInstance(BASE_URL_1)
export const translationApi = createApiInstance(BASE_URL_2)
