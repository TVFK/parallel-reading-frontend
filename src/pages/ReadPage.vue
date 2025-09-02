<template>
  <div class="relative w-full min-h-screen transition-colors duration-300" :class="themeClasses">
    <!-- Navigation Bar -->
    <ReadPageNavBar :book="book" :chapter="currentChapter" @toggle-chapters="showChapters = !showChapters"
      @toggle-settings="showSettings = !showSettings" />

    <!-- Backdrop -->
    <div v-if="showChapters || showSettings" @click="showChapters = false; showSettings = false"
      class="fixed inset-0 bg-black/30 z-30" />

    <!-- Chapter Drawer -->
    <ChapterDrawer v-model:visible="showChapters" :chapters="chapters" @select="goToChapter" />

    <!-- Settings Drawer -->
    <SettingsDrawer v-model:visible="showSettings" />

    <!-- Text Content -->
    <TextContent :sentences="sentences" :title="currentChapter?.title" :split="splitSentence" :on-hover="handleHover"
      :on-click="handleTextClick" :is-highlighted="isPartHighlighted" :font="font" :text-size="textSize"
      :theme="theme" />

    <!-- Индикатор страницы -->
    <div class="w-full max-w-[1205px] mx-auto px-4 py-4 text-center">
      <div class="inline-block bg-white/80 px-4 py-2 rounded-full shadow-lg">
        Page {{ page?.pageNumber || 1 }} of {{ book?.numberOfPage || 1 }}
      </div>
    </div>

    <!-- Translation Cards -->
    <SentenceTranslationCard v-bind="sentenceTranslationCard" />
    <WordTranslationCard v-bind="wordTranslationCard" />

    <button @click="prevPage" :disabled="!page || page.pageNumber <= 1"
      class="fixed left-4 top-1/2 transform -translate-y-1/2 p-2 disabled:opacity-30 z-30">
      <IconArrow class="rotate-180 w-[18px] h-[60px]" />
    </button>

    <button @click="nextPage" :disabled="!page || page.pageNumber >= (book?.numberOfPage || 1)"
      class="fixed right-4 top-1/2 transform -translate-y-1/2 p-2 disabled:opacity-30 z-30">
      <IconArrow class="w-[18px] h-[60px]" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import ReadPageNavBar from '@/components/read-page/ReadPageNavBar.vue'
import ChapterDrawer from '@/components/read-page/ChapterDrawer.vue'
import SettingsDrawer from '@/components/read-page/SettingsDrawer.vue'  // Новый компонент
import TextContent from '@/components/read-page/TextContent.vue'
import SentenceTranslationCard from '@/components/read-page/SentenceTranslationCard.vue'
import WordTranslationCard from '@/components/read-page/WordTranslationCard.vue'
import { useBookLoader } from '@/composables/useBookLoader'
import { useSentenceInteraction } from '@/composables/useSentenceInteraction'
import { useTranslationCard } from '@/composables/useTranslationCard'
import { useSettings } from '@/composables/useSettings'
import IconArrow from '@/components/icons/IconArrow.vue'

const route = useRoute()

const { book, chapters, page, goToChapter, nextPage, prevPage } = useBookLoader(route)

const sentences = computed(() => page.value?.sentences || [])

const {
  sentenceTranslationCard,
  wordTranslationCard,
  showSentenceTranslation,
  showWordTranslation,
} = useTranslationCard()

const {
  splitSentence,
  handleWordHover,
  handleTextClick,
  isPartHighlighted,
} = useSentenceInteraction(sentences, {
  showSentence: showSentenceTranslation,
  showWord: showWordTranslation,
})

function handleHover(i: number | null, j: number | null, e: MouseEvent) {
  handleWordHover(i, j, e)
}

const currentChapter = computed(() =>
  chapters.value.find(ch => ch.id === page.value?.chapterId) || null
)

const showChapters = ref(false)
const showSettings = ref(false)

// Настройки
const { font, textSize, theme } = useSettings()

// Классы для корневого div на основе темы
const themeClasses = computed(() => {
  switch (theme.value) {
    case 'dark': return 'bg-gray-900 text-white'
    case 'book': return 'bg-yellow-50 text-yellow-900'
    default: return 'bg-white text-[#000000]'
  }
})
</script>
