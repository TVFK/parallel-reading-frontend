<template>
  <div v-if="show" ref="cardRef"
    class="fixed z-50 p-5 bg-white border border-gray-200 rounded-xl shadow-xl max-w-xs w-full max-h-[70vh] overflow-y-auto cursor-default transition-all duration-200 ease-out"
    :style="{ left: `${adjustedX}px`, top: `${adjustedY}px` }" @click.stop>
    <div v-if="loading" class="flex justify-center items-center h-20">
      <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
    </div>

    <div v-else-if="error" class="text-red-500 p-4 text-sm">
      Ошибка при загрузке перевода
    </div>

    <div v-else>
      <div class="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
        <div class="flex items-center">
          <h3 class="text-lg font-bold text-gray-800">{{ word }}</h3>
          <span v-if="transcription" class="text-sm text-gray-500 ml-2">[{{ transcription }}]</span>
        </div>
        <button @click="addToDictionary" :disabled="addingToDictionary"
          class="cursor-pointer flex items-center justify-center p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
          :class="{ 'opacity-50 cursor-not-allowed': addingToDictionary }" title="Добавить в словарь">
          <svg v-if="!addingToDictionary" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          <svg v-else class="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
            </path>
          </svg>
        </button>
      </div>

      <div class="space-y-4 mb-3">
        <div v-for="(definition, index) in definitions" :key="index" class="definition-item">
          <div class="text-sm font-semibold text-blue-600 mb-1">
            {{ definition.pos }}
          </div>

          <ul class="space-y-2 pl-2">
            <li v-for="(trans, tIndex) in definition.translations" :key="tIndex" class="translation-item">
              <div class="font-medium text-gray-800 text-sm">{{ trans.text }}</div>

              <div v-if="trans.aspect || trans.meanings.length" class="text-xs text-gray-500 mt-1 space-y-1">
                <div v-if="trans.aspect" class="aspect-badge">
                  Вид: {{ trans.aspect === 'сов' ? 'совершенный' : 'несовершенный' }}
                </div>
                <div v-if="trans.meanings.length">
                  Значения: <span class="italic">{{ trans.meanings.join(', ') }}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="addResult" class="mb-3 p-2 rounded-md text-sm"
        :class="addResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
        {{ addResult.message }}
      </div>

      <div class="pt-2 border-t border-gray-100 text-xs text-gray-600 text-center">
        Реализовано с помощью сервиса
        <a href="https://api.yandex.ru/dictionary/" target="_blank" rel="noopener noreferrer"
          class="text-blue-500 hover:underline">
          API «Яндекс.Словарь»
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTranslationCard } from '@/composables/useTranslationCard'
import type { NewDictionaryCard } from '@/types/NewDictionaryCard'
import { useDictionaryStore } from '@/stores/DictionaryStore';

const props = defineProps<{
  show: boolean
  word: string
  x: number
  y: number
  loading: boolean
  error: boolean
  transcription?: string
  context: string
  definitions: Array<{
    pos: string
    translations: Array<{
      text: string
      aspect?: string
      meanings: string[]
    }>
  }>
}>()

const dictionaryStore = useDictionaryStore()
const cardRef = ref<HTMLElement | null>(null)
const addingToDictionary = ref(false)
const addResult = ref<{ success: boolean, message: string } | null>(null)

const adjustedX = computed(() => {
  const maxX = window.innerWidth - 320 // card max-width
  return Math.min(Math.max(16, props.x), maxX - 16)
})
const adjustedY = computed(() => {
  const maxY = window.innerHeight - 400 // estimated card height
  return Math.min(Math.max(16, props.y + 20), maxY - 16)
})

const addToDictionary = async () => {
  if (!props.definitions.length || !props.definitions[0].translations.length) return

  addingToDictionary.value = true
  addResult.value = null

  try {
    const firstTranslation = props.definitions[0].translations[0].text
    const newCard: NewDictionaryCard = {
      word: props.word,
      translation: firstTranslation,
      difficulty: 2,
      context: props.context
    }

    await dictionaryStore.createDictionaryCard(newCard)
    addResult.value = {
      success: true,
      message: 'Слово успешно добавлено в словарь'
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ошибка при добавлении в словарь'
    addResult.value = { success: false, message }
  } finally {
    addingToDictionary.value = false

    setTimeout(() => {
      addResult.value = null
    }, 3000)
  }
}

onMounted(() => {
  if (cardRef.value) {
    const { setWordCardRef } = useTranslationCard()
    setWordCardRef(cardRef.value)
  }
})
</script>
