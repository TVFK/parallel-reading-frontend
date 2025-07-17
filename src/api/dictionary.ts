import { dictionaryApi } from '@/api/http'
import type { DictionaryCard } from '@/types/DictionaryCard'
import type { NewDictionaryCard } from '@/types/NewDictionaryCard'
import type { UpdateDictionaryCard } from '@/types/UpdateDictionaryCard'
import axios from 'axios'

export const DictionaryService = {
  async fetchDictionaryCardById(cardId: string): Promise<DictionaryCard> {
    try {
      const response = await dictionaryApi.get<DictionaryCard>(`/dictionary/${cardId}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const validationErrors = error.response.data
          throw new Error(validationErrors)
        }
        if (error.response?.status === 403) {
          throw new Error('Недостаточно прав для изменения карточки')
        }
        if (error.response?.status === 404) {
          throw new Error('Карточка не найдена')
        }
      }
      throw new Error('Ошибка при обновлении карточки')
    }
  },

  async fetchDictionaryCards(
    page: number,
    size: number,
    sort: string,
  ): Promise<{ content: DictionaryCard[]; totalPages: number }> {
    try {
      const response = await dictionaryApi.get('/dictionary', {
        params: { page, size, sort },
      })
      return {
        content: response.data.content,
        totalPages: response.data.totalPages,
      }
    } catch (error) {
      console.error('Ошибка при получении карточек словаря:', error)
      throw error
    }
  },

  async createDictionaryCard(card: NewDictionaryCard): Promise<DictionaryCard> {
    try {
      const response = await dictionaryApi.post<DictionaryCard>('/dictionary', card)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const validationErrors = error.response.data
          throw new Error(validationErrors)
        }
        if (error.response?.status === 403) {
          throw new Error('Недостаточно прав для изменения карточки')
        }
      }
      throw new Error('Ошибка при обновлении карточки')
    }
  },

  async updateDictionaryCard(cardId: string, card: UpdateDictionaryCard): Promise<void> {
    try {
      const response = await dictionaryApi.patch(`/dictionary/${cardId}`, card)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          const validationErrors = error.response.data
          throw new Error(validationErrors)
        }
        if (error.response?.status === 403) {
          throw new Error('Недостаточно прав для изменения карточки')
        }
        if (error.response?.status === 404) {
          throw new Error('Карточка не найдена')
        }
      }
      throw new Error('Ошибка при обновлении карточки')
    }
  },

  async deleteDictionaryCard(cardId: string): Promise<void> {
    try {
      const response = await dictionaryApi.delete(`/dictionary/${cardId}`)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          throw new Error('Недостаточно прав для удаления карточки')
        }
      }
      throw new Error('Ошибка при удалении карточки')
    }
  },
}
