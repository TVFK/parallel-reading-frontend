<template>
  <div class="relative w-full min-h-screen transition-colors duration-300">
    <!-- Navigation Bar -->
    <ReadPageNavBar :book="book" :chapter="currentChapter" @toggle-chapters="showChapters = !showChapters"
      @toggle-settings="showSettings = !showSettings" />

    <!-- Chapter Drawer -->
    <ChapterDrawer v-model:visible="showChapters" :chapters="chapters" @select="goToChapter" />

    <!-- Backdrop -->
    <div v-if="showChapters || showSettings" @click="showChapters = false; showSettings = false"
      class="fixed inset-0 bg-black/30 z-40" />

    <!-- Text Content -->
    <TextContent :sentences="sentences" :title="currentChapter?.title" :split="splitSentence" :on-hover="handleHover"
      :on-click="handleTextClick" :is-highlighted="isPartHighlighted" />

    <!-- Translation Cards -->
    <SentenceTranslationCard v-bind="sentenceTranslationCard" />
    <WordTranslationCard v-bind="wordTranslationCard" />

    <!-- Pagination Controls -->
    <PaginationControls :page="page?.pageNumber || 1" :total="book?.numberOfPage || 1" @next="nextPage"
      @prev="prevPage" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import ReadPageNavBar from '@/components/read-page/ReadPageNavBar.vue';
import ChapterDrawer from '@/components/read-page/ChapterDrawer.vue';
import TextContent from '@/components/read-page/TextContent.vue';
import SentenceTranslationCard from '@/components/read-page/SentenceTranslationCard.vue';
import WordTranslationCard from '@/components/read-page/WordTranslationCard.vue';
import PaginationControls from '@/components/read-page/PaginationControls.vue';

import { useBookLoader } from '@/composables/useBookLoader';
import { useSentenceInteraction } from '@/composables/useSentenceInteraction';
import { useTranslationCard } from '@/composables/useTranslationCard';

const route = useRoute();

// load book, chapters, page and navigation handlers
const { book, chapters, page, goToChapter, nextPage, prevPage } = useBookLoader(route);

// flatten sentences array for composable
const sentences = computed(() => page.value?.sentences || []);

// translation cards and handlers
const {
  sentenceTranslationCard,
  wordTranslationCard,
  showSentenceTranslation,
  showWordTranslation
} = useTranslationCard();

// sentence interaction (split, hover, click, highlight)
// now handleHover accepts nulls to clear highlight
const {
  splitSentence,
  handleWordHover,
  handleTextClick,
  isPartHighlighted
} = useSentenceInteraction(sentences, {
  showSentence: showSentenceTranslation,
  showWord: showWordTranslation
});

// wrap hover to accept null args
function handleHover(i: number | null, j: number | null, e: MouseEvent) {
  handleWordHover(i, j, e);
}

// computed current chapter for title
const currentChapter = computed(() =>
  chapters.value.find(ch => ch.id === page.value?.chapterId) || null
);

// UI state
const showChapters = ref(false);
const showSettings = ref(false);

</script>
