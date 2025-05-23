import { translationApi } from '@/api/http'
import type { WordTranslation } from '@/types/WordTranlation'

export const TranslationService = {
  async translate(text: string): Promise<WordTranslation> {
    try {
      const response = await translationApi.get(`/translations?text=${text}`)
      return response.data
    } catch (error) {
      console.error('Ошибка при переводе текста:', error)
      throw error
    }
  },
}
