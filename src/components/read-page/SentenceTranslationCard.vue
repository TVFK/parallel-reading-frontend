<template>
  <div v-if="show" ref="cardRef"
    class="fixed z-50 p-5 bg-white border border-gray-200 rounded-xl shadow-xl max-w-[320px] cursor-default transition-all duration-200 ease-out"
    :style="{ left: `${adjustedX}px`, top: `${adjustedY}px` }" @click.stop>
    <div v-if="loading" class="text-gray-600 text-sm flex items-center justify-center">
      <svg class="animate-spin h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      Загрузка...
    </div>
    <div v-else-if="error" class="text-red-500 font-medium text-sm">Ошибка перевода</div>
    <div v-else class="space-y-3">
      <div class="font-semibold text-gray-800 text-base border-b border-gray-200 pb-2">{{ original }}</div>
      <div class="text-gray-700 text-sm leading-relaxed">{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTranslationCard } from '@/composables/useTranslationCard'

const props = defineProps<{ show: boolean; x: number; y: number; loading: boolean; error: boolean; original: string; text: string }>()

const cardRef = ref<HTMLElement | null>(null)

// Adjust position to prevent card from going off-screen
const adjustedX = computed(() => {
  const maxX = window.innerWidth - 320 // card max-width
  return Math.min(Math.max(16, props.x), maxX - 16)
})
const adjustedY = computed(() => {
  const maxY = window.innerHeight - 200 // estimated card height
  return Math.min(Math.max(16, props.y + 20), maxY - 16)
})

onMounted(() => {
  if (cardRef.value) {
    const { setSentenceCardRef } = useTranslationCard()
    setSentenceCardRef(cardRef.value)
  }
})
</script>
