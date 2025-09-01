import axios, { type AxiosInstance } from 'axios'
import { useKeycloak, getToken } from '@josempgon/vue-keycloak'

const BOOKS_API_URL = import.meta.env.VITE_BOOKS_API_URL
const TRANSLATION_URL = import.meta.env.VITE_API_TRANSLATION_URL
const DICTIONARY_URL = import.meta.env.VITE_API_DICTIONARY_URL
const keycloak = useKeycloak()

const createApiInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  instance.interceptors.request.use(async (config) => {
    try {
      const token = await getToken(30)
      console.log(token)
      config.headers.Authorization = `Bearer ${token}`
      return config
    } catch (error) {
      console.error('Ошибка при получении токена:', error)
      throw error
    }
  })

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        window.location.reload()
      }
      return Promise.reject(error)
    },
  )

  return instance
}

export const booksApi = createApiInstance(BOOKS_API_URL)
export const translationApi = createApiInstance(TRANSLATION_URL)
export const dictionaryApi = createApiInstance(DICTIONARY_URL)
