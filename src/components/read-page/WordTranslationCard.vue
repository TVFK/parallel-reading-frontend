<template>
  <div v-if="show" ref="cardRef"
    class="fixed z-50 p-5 bg-white border border-gray-200 rounded-xl shadow-xl max-w-xs w-full max-h-[70vh] overflow-y-auto cursor-default transition-all duration-200 ease-out"
    :style="{ left: `${adjustedX}px`, top: `${adjustedY}px` }" @click.stop>
    <!-- Лоадер -->
    <div v-if="loading" class="flex justify-center items-center h-20">
      <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="text-red-500 p-4 text-sm">
      Ошибка при загрузке перевода
    </div>

    <!-- Контент -->
    <div v-else>
      <!-- Заголовок с словом -->
      <div class="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
        <h3 class="text-lg font-bold text-gray-800">{{ word }}</h3>
        <span v-if="transcription" class="text-sm text-gray-500 ml-2">[{{ transcription }}]</span>
      </div>

      <!-- Список определений -->
      <div class="space-y-4 mb-3">
        <div v-for="(definition, index) in definitions" :key="index" class="definition-item">
          <!-- Часть речи -->
          <div class="text-sm font-semibold text-blue-600 mb-1">
            {{ definition.pos }}
          </div>

          <!-- Список переводов -->
          <ul class="space-y-2 pl-2">
            <li v-for="(trans, tIndex) in definition.translations" :key="tIndex" class="translation-item">
              <div class="font-medium text-gray-800 text-sm">{{ trans.text }}</div>

              <!-- Дополнительная информация -->
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

      <!-- Обязательное упоминание Яндекс.Словаря -->
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

const props = defineProps<{
  show: boolean
  word: string
  x: number
  y: number
  loading: boolean
  error: boolean
  transcription?: string
  definitions: Array<{
    pos: string
    translations: Array<{
      text: string
      aspect?: string
      meanings: string[]
    }>
  }>
}>()

const cardRef = ref<HTMLElement | null>(null)

const adjustedX = computed(() => {
  const maxX = window.innerWidth - 320 // card max-width
  return Math.min(Math.max(16, props.x), maxX - 16)
})
const adjustedY = computed(() => {
  const maxY = window.innerHeight - 400 // estimated card height
  return Math.min(Math.max(16, props.y + 20), maxY - 16)
})

onMounted(() => {
  if (cardRef.value) {
    const { setWordCardRef } = useTranslationCard()
    setWordCardRef(cardRef.value)
  }
})
</script>
