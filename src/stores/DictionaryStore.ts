import { defineStore } from 'pinia'
import { DictionaryService } from '@/api/dictionary'
import type { DictionaryCard } from '@/types/DictionaryCard'
import { ref } from 'vue'
import type { NewDictionaryCard } from '@/types/NewDictionaryCard'
import type { UpdateDictionaryCard } from '@/types/UpdateDictionaryCard'

export const useDictionaryStore = defineStore('dictionaryStore', () => {
  const dictionaryCards = ref<DictionaryCard[]>([])
  const totalPages = ref(0)
  const isLoading = ref(false)

  const fetchDictionaryCards = async (page: number, size: number, sort: string) => {
    isLoading.value = true
    try {
      const response = await DictionaryService.fetchDictionaryCards(page, size, sort)
      dictionaryCards.value = response.content
      totalPages.value = response.totalPages
    } finally {
      isLoading.value = false
    }
  }

  const createDictionaryCard = async (card: NewDictionaryCard) => {
    return await DictionaryService.createDictionaryCard(card)
  }

  const updateDictionaryCard = async (cardId: string, card: UpdateDictionaryCard) => {
    return await DictionaryService.updateDictionaryCard(cardId, card)
  }

  const deleteDictionaryCard = async (cardId: string) => {
    await DictionaryService.deleteDictionaryCard(cardId)
    dictionaryCards.value = dictionaryCards.value.filter((card) => card.id !== cardId)
  }

  const getCardById = async (cardId: string) => {
    return await DictionaryService.fetchDictionaryCardById(cardId)
  }

  return {
    dictionaryCards,
    totalPages,
    isLoading,
    fetchDictionaryCards,
    createDictionaryCard,
    updateDictionaryCard,
    deleteDictionaryCard,
    getCardById,
  }
})
