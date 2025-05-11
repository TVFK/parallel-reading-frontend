<template>
  <div class="relative w-full min-h-screen transition-colors duration-300">
    <!-- Карточка перевода предложения -->
    <div v-if="translationCard.show" class="fixed z-50 p-4 bg-white border rounded-lg shadow-lg max-w-[300px]" :style="{
      left: `${translationCard.x}px`,
      top: `${translationCard.y + 20}px`
    }">
      <div v-if="translationCard.loading">Загрузка...</div>
      <div v-else-if="translationCard.error" class="text-red-500">Ошибка перевода</div>
      <div v-else class="space-y-2">
        <div class="font-medium border-b pb-1">{{ translationCard.original }}</div>
        <div>{{ translationCard.text }}</div>
      </div>
    </div>

    <WordTranslationCard v-if="wordTranslationCard.show" :word="wordTranslationCard.word" :x="wordTranslationCard.x"
      :y="wordTranslationCard.y" :loading="wordTranslationCard.loading" :error="wordTranslationCard.error"
      :transcription="wordTranslationCard.transcription" :definitions="wordTranslationCard.definitions" />

    <!-- Окно со списком глав -->
    <div v-if="showChapters"
      class="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6 border-l border-gray-200 z-50">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold">Главы</h3>
        <button @click="showChapters = false" class="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <ul class="space-y-2">
        <li v-for="chapter in chapters" :key="chapter.id" class="cursor-pointer hover:scale-105 transition-transform"
          @click="goToChapter(chapter.id)">
          {{ chapter.title }}
        </li>
      </ul>
    </div>

    <div v-if="showSettings || showChapters" @click="showSettings = false; showChapters = false"
      class="fixed inset-0 bg-black/30 z-40">
    </div>

    <!-- Навигационная панель -->
    <div
      class="fixed top-0 left-0 w-full h-[40px] bg-white border-b-4 border-white shadow-md flex items-center justify-between px-4">
      <div class="cursor-pointer flex items-center space-x-2">
        <span @click="$router.push('/books')" class="text-[20px] font-arial text-[#292D32]">Каталог</span>
        <IconArrow class="w-[6.82px] h-[15px] flex items-center" />
        <span @click="$router.push(`/books/review/${book?.title}`)" class="text-[20px] font-arial text-[#292D32]">{{
          book?.title }}</span>
        <IconArrow class="w-[6.82px] h-[15px] flex items-center" />
        <span class="text-[20px] font-arial text-[#292D32]">Глава {{ currentChapter?.title }}</span>
      </div>
      <div class="flex items-center space-x-4">
        <IconStructure @click="showChapters = !showChapters"
          class="w-[25px] h-[25px] cursor-pointer hover:opacity-80" />
        <IconSettings @click="showSettings = !showSettings" class="w-[25px] h-[25px] cursor-pointer hover:opacity-80" />
      </div>
    </div>

    <!-- Текст книги -->
    <div class="mt-[40px] w-full max-w-[1205px] mx-auto px-4 transition-all duration-300">
      <div class="text-center text-[32px] font-lora text-[#000000] opacity-59 mb-8">
        {{ currentChapter?.title }}
      </div>
      <div class="text-[26px] font-lora leading-[157%] tracking-[0.09em] text-justify text-[#000000]">
        <p class="indent-[40px]">
          <template v-for="(sentence, sentenceIndex) in page?.sentences" :key="sentenceIndex">
            <template v-for="(part, partIndex) in splitSentence(sentence.originalText)" :key="partIndex">
              <span @mouseover="handleWordHover(sentenceIndex, partIndex, $event)" @mouseleave="hoverState = null"
                @click="handleTextClick(sentenceIndex, partIndex, $event)"
                :class="['transition-colors', (isPartHighlighted(sentenceIndex, partIndex) ? 'bg-[#A9A8FD] rounded-md' : ''), { 'cursor-pointer': isClickablePart(part) }]">
                {{ part }}
              </span>
            </template>
            <!-- Добавляем пробел между предложениями -->
            <span> </span>
          </template>
        </p>
      </div>
    </div>
    <div>
      <div class="mb-10 text-center text-[24px] font-lora text-[#292D32] opacity-74 mt-8">
        Page {{ page?.pageNumber }} of {{ book?.numberOfPage }}
      </div>
      <IconArrow @click="nextPage"
        class="cursor-pointer fixed right-[56.55px] top-1/2 transform -translate-y-1/2 w-[15.45px] h-[56.67px]" />
      <IconArrow v-if="page?.pageNumber !== 1" @click="prevPage"
        class="cursor-pointer fixed left-[56.55px] top-1/2 transform -translate-y-1/2 rotate-180 w-[15.45px] h-[56.67px]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue';
import IconArrow from '@/components/icons/IconArrow.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconStructure from '@/components/icons/IconStructure.vue';
import WordTranslationCard from '@/components/WordTranslationCard.vue';
import type { DefaultJsonTranslationResponse } from '@/types/Translation';
import type { Page } from '@/types/Page';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import type { Chapter } from '@/types/Chapter';
import type { Book } from '@/types/Book';
import { useBookContextStore } from '@/stores/BookContextStore';
import type { Sentence } from '@/types/Sentence';
import { usePagesStore } from '@/stores/PageStore';
import { useChaptersStore } from '@/stores/ChaptersStore';

const route = useRoute();
const router = useRouter();
const bookContextStore = useBookContextStore();

const book = ref<Book | null>(null)
const chapters = ref<Chapter[]>([])
const page = ref<Page>();

const pageStore = usePagesStore();
const chaptersStore = useChaptersStore();

const currentChapter = computed(() => {
  return chapters.value.find(chapter => chapter.id === page.value?.chapterId);
});

const showSettings = ref(false);
const showChapters = ref(false);

const translationCard = reactive({
  show: false,
  original: '',
  text: '',
  loading: false,
  error: false,
  x: 0,
  y: 0
});

const closeTranslationCard = () => {
  translationCard.show = false;
  document.removeEventListener('click', closeTranslationCard);
};

function goToChapter(pageNumber: number) {
  router.push({
    query: { pageNumber }
  });
  showChapters.value = false;
}

onMounted(async () => {
  if (bookContextStore.currentBook?.title !== route.params.bookTitle) {
    await bookContextStore.fetchBookByTitle(route.params.bookTitle as string);
  }
  book.value = bookContextStore.currentBook;

  await pageStore.fetchPageByBookId(book.value?.id as number, Number(route.query.pageNumber))
  page.value = pageStore.currentPage;

  chapters.value = chaptersStore.getChapters(book.value?.id as number);
});

async function nextPage() {
  await pageStore.navigatePage('next')
}

async function prevPage() {
  await pageStore.navigatePage('prev')
}

const hoverState = ref<{ sentenceIndex: number; partIndex: number } | null>(null)

const splitSentence = (text: string) => text.split(/(\s+)/)
const isSpace = (part: string) => /\s+/.test(part)

const handleWordHover = (sentenceIndex: number, partIndex: number, event: MouseEvent) => {
  const sentence = page.value?.sentences[sentenceIndex]
  if (!sentence) return
  const part = splitSentence(sentence.originalText)[partIndex]
  hoverState.value = { sentenceIndex, partIndex: isSpace(part) ? -1 : partIndex }
}

const handleTextClick = async (sentenceIndex: number, partIndex: number, event: MouseEvent) => {
  const sentence = page.value?.sentences[sentenceIndex]
  if (!sentence) return
  const parts = splitSentence(sentence.originalText)
  const part = parts[partIndex]

  if (isSpace(part)) {
    showSentenceTranslation(sentence, event)
  } else {
    await showWordTranslation(part, event)
  }
}

const showSentenceTranslation = (sentence: Sentence, event: MouseEvent) => {
  translationCard.original = sentence.originalText
  translationCard.text = sentence.translatedText
  translationCard.x = event.clientX
  translationCard.y = event.clientY
  translationCard.show = true
  setTimeout(() => {
    document.addEventListener('click', closeTranslationCard, { once: true })
  }, 10)
}

const isClickablePart = (part: string) => {
  return isSpace(part) || part.trim().length > 0
}

const isPartHighlighted = (sentenceIndex: number, partIndex: number) => {
  if (hoverState.value?.sentenceIndex === sentenceIndex) {
    return hoverState.value.partIndex === -1 || hoverState.value.partIndex === partIndex
  }
  return false
}

// Добавляем состояние для карточки слова
const wordTranslationCard = reactive({
  show: false,
  word: '',
  transcription: '',
  definitions: [] as Array<{
    pos: string
    translations: Array<{
      text: string
      aspect?: string
      meanings: string[]
    }>
  }>,
  loading: false,
  error: false,
  x: 0,
  y: 0
})

// Реализуем логику перевода слова
const showWordTranslation = async (word: string, event: MouseEvent) => {
  try {
    wordTranslationCard.show = true
    wordTranslationCard.word = word
    wordTranslationCard.x = event.clientX
    wordTranslationCard.y = event.clientY
    wordTranslationCard.loading = true
    wordTranslationCard.error = false

    const response = await axios.get<DefaultJsonTranslationResponse>(
      `http://localhost:8081/translations?text=${word}`
    )

    wordTranslationCard.transcription = response.data.definitions[0]?.ts || ''
    wordTranslationCard.definitions = response.data.definitions.map((def: {
      pos: string
      translations: Array<{
        text: string
        asp?: string
        meanings: string[]
      }>
    }) => ({
      pos: def.pos,
      translations: def.translations.map((tr: {
        text: string
        asp?: string
        meanings: string[]
      }) => ({
        text: tr.text,
        aspect: tr.asp,
        meanings: tr.meanings
      }))
    }))
  } catch (err) {
    wordTranslationCard.error = true
  } finally {
    wordTranslationCard.loading = false
  }

  setTimeout(() => {
    document.addEventListener('click', closeWordTranslationCard, { once: true })
  }, 10)
}

const closeWordTranslationCard = () => {
  wordTranslationCard.show = false
  document.removeEventListener('click', closeWordTranslationCard)
}
</script>
