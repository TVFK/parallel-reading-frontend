import { TranslationService } from '@/api/translation'
import type { WordTranslation } from '@/types/WordTranlation'
import { defineStore } from 'pinia'

export const useTranslationStore = defineStore('translationStore', () => {
  const translationsCache = new Map<string, WordTranslation>()

  const fetchTranslation = async (text: string) => {
    try {
      const response = await TranslationService.translate(text)
      translationsCache.set(text, response)
    } catch (error) {
      console.error('Ошибка при переводе текста:', error)
      throw error
    }
  }

  const getTranslation = (text: string): WordTranslation => {
    if (!translationsCache.has(text)) {
      fetchTranslation(text)
    }
    return translationsCache.get(text) as WordTranslation
  }

  return {
    getTranslation,
  }
})
