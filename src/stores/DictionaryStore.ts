import { defineStore } from 'pinia'
import { DictionaryService } from '@/api/dictionary'
import type { DictionaryCard } from '@/types/DictionaryCard'
import { ref } from 'vue'
import type { NewDictionaryCard } from '@/types/NewDictionaryCard'
import type { UpdateDictionaryCard } from '@/types/UpdateDictionaryCard'

export const useDictionaryStore = defineStore('dictionaryStore', () => {
  const dictionaryCards = ref<DictionaryCard[]>([])

  const fetchDictionaryCards = async () => {
    dictionaryCards.value = await DictionaryService.fetchDictionaryCards()
  }

  const createDictionaryCard = async (card: NewDictionaryCard) => {
    return await DictionaryService.createDictionaryCard(card)
  }

  const updateDictionaryCard = async (cardId: number, card: UpdateDictionaryCard) => {
    return await DictionaryService.updateDictionaryCard(cardId, card)
  }

  const deleteDictionaryCard = async (cardId: number) => {
    return await DictionaryService.deleteDictionaryCard(cardId)
  }

  return {
    dictionaryCards,
    fetchDictionaryCards,
    createDictionaryCard,
    updateDictionaryCard,
    deleteDictionaryCard,
  }
})
