<template>
  <div class="relative w-full min-h-screen transition-colors duration-300" :class="[backgroundClass]">
    <!-- Карточка перевода -->
    <div v-if="translationCard.show" class="fixed z-50 p-3 bg-white border rounded-lg shadow-lg max-w-[200px]" :style="{
      left: `${translationCard.x}px`,
      top: `${translationCard.y + 20}px`
    }">
      <div v-if="translationCard.loading">Загрузка...</div>
      <div v-else-if="translationCard.error" class="text-red-500">Ошибка перевода</div>
      <div v-else>{{ translationCard.text }}</div>
    </div>

    <!-- Настройки страницы -->
    <div v-if="showSettings"
      class="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6 border-l border-gray-200 z-50">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold">Настройки</h3>
        <button @click="showSettings = false" class="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <div class="mb-6">
        <h4 class="font-medium mb-3">Цвет фона</h4>
        <div class="flex space-x-2">
          <button v-for="bg in backgrounds" :key="bg.value" @click="selectedBackground = bg.value"
            class="w-8 h-8 rounded-full border-2 transition-all" :class="[
              bg.class,
              selectedBackground === bg.value
                ? 'border-indigo-500 scale-110'
                : 'border-gray-200 hover:border-gray-300'
            ]"></button>
        </div>
      </div>
      <div class="mb-6">
        <h4 class="font-medium mb-3">Размер шрифта</h4>
        <input type="range" min="16" max="32" v-model="fontSize" class="w-full accent-indigo-500">
        <div class="text-sm text-gray-600 mt-1">{{ fontSize }}px</div>
      </div>
      <div>
        <h4 class="font-medium mb-3">Шрифт</h4>
        <select v-model="selectedFont"
          class="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option v-for="font in fonts" :key="font" :value="font">
            {{ font }}
          </option>
        </select>
      </div>
    </div>

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

    <div class="mt-[40px] w-full max-w-[1205px] mx-auto px-4 transition-all duration-300" :style="{
      fontSize: `${fontSize}px`,
      fontFamily: selectedFont
    }">
      <div class="text-center text-[32px] font-lora text-[#000000] opacity-59 mb-8">
        {{ currentChapter?.title }}
      </div>
      <div class="text-[26px] font-lora leading-[157%] tracking-[0.09em] text-justify text-[#000000]">
        <p class="indent-[40px]">
          <span v-for="(word, index) in words" :key="index" @mouseover="highlightWord(index)"
            @mouseleave="unhighlightWord" @click="showTranslation(word, $event)"
            :class="{ 'bg-[#A9A8FD] rounded-md': highlightedWordIndex === index && word.trim() !== '' }"
            class="cursor-pointer transition-colors">
            {{ word }}
          </span>
        </p>
      </div>
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
import { ref, computed, onMounted, watch, reactive } from 'vue';
import IconArrow from '@/components/icons/IconArrow.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconStructure from '@/components/icons/IconStructure.vue';
import type { Page } from '@/types/Page';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useBooksStore } from '@/stores/BooksStore';
import type { Chapter } from '@/types/Chapter';
import type { Book } from '@/types/Book';

const route = useRoute();
const router = useRouter();
const booksStore = useBooksStore();


const book = ref<Book>()
// TODO кэширование сделать в Pinia
const chapters = ref<Chapter[]>([])
const page = ref<Page>();
const currentChapter = computed(() => {
  return chapters.value.find(chapter => chapter.id === page.value?.chapterId);
});

// Условия для настроек
const showSettings = ref(false);
const showChapters = ref(false);
const fontSize = ref(20);
const selectedFont = ref('Lora');
const selectedBackground = ref('light');

const backgrounds = [
  { value: 'light', class: 'bg-white' },
  { value: 'dark', class: 'bg-gray-900' },
  { value: 'book', class: 'bg-amber-50' }
];

const fonts = ['Lora', 'Arial', 'Georgia', 'Helvetica'];

const backgroundClass = computed(() => {
  return backgrounds.find(bg => bg.value === selectedBackground.value)?.class;
});

const highlightedWordIndex = ref<number | null>(null);
const words = computed(() => {
  return page.value?.content?.split(/(\s+)/) || [];
});

const highlightWord = (index: number) => {
  if (words.value[index].trim() !== '') {
    highlightedWordIndex.value = index;
  }
};

const unhighlightWord = () => {
  highlightedWordIndex.value = null;
};

const translationCard = reactive({
  show: false,
  text: '',
  loading: false,
  error: false,
  x: 0,
  y: 0
});

const showTranslation = async (word: string, event: MouseEvent) => {
  const cleanWord = word.replace(/[.,!?;:«»"']/g, '').trim();
  if (!cleanWord) return;

  translationCard.loading = true;
  translationCard.error = false;
  translationCard.show = true;
  translationCard.x = event.clientX;
  translationCard.y = event.clientY;

  try {
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: cleanWord,
        source: 'ru',
        target: 'en',
        format: 'text',
        api_key: '' // Если нужно, добавьте API-ключ
      })
    });

    if (!response.ok) throw new Error('Ошибка API');

    const data = await response.json();
    translationCard.text = data.translatedText;
  } catch (e) {
    translationCard.error = true;
    translationCard.text = 'Ошибка перевода';
  } finally {
    translationCard.loading = false;
  }

  setTimeout(() => {
    document.addEventListener('click', closeTranslationCard);
  }, 10);
};

const closeTranslationCard = () => {
  translationCard.show = false;
  document.removeEventListener('click', closeTranslationCard);
};

function saveSettings() {
  localStorage.setItem('readerSettings', JSON.stringify({
    fontSize: fontSize.value,
    font: selectedFont.value,
    background: selectedBackground.value
  }));
}

// TODO сделать, чтобы отправлялось к нужной странице
function goToChapter(chapterId: number) {
  router.push({
    query: { chapterId }
  });
  showChapters.value = false;
}

onMounted(() => {
  const savedSettings = localStorage.getItem('readerSettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    fontSize.value = settings.fontSize;
    selectedFont.value = settings.font;
    selectedBackground.value = settings.background;
  }
});

watch([fontSize, selectedFont, selectedBackground], () => {
  saveSettings();
});

onMounted(async () => {
  const pageResponse = await axios.get<Page>(`http://localhost:8080/read/books/${route.params.bookTitle}`, {
    params: {
      pageNumber: route.query.pageNumber,
    },
  });
  if (!pageResponse.data) {
    throw Error('Страница не найдена');
  }
  page.value = pageResponse.data;
  await fetchBookByTitle(route.params.bookTitle as string)
  fetchChaptersByBookId(book.value!.id)
});

async function fetchBookByTitle(title: string) {
  try {
    const response = await axios.get<Book>(`http://localhost:8080/books/${title}`)
    book.value = response.data
  } catch (err) {
    console.log("ошибка при загрузке глав")
  }
}

async function fetchChaptersByBookId(bookId: number) {
  try {
    const response = await axios.get<Chapter[]>(`http://localhost:8080/books/${bookId}/chapters`)
    chapters.value = response.data
  } catch (err) {
    console.log("ошибка при загрузке глав")
  }
}

async function nextPage() {
  try {
    const response = await axios.get<Page>('http://localhost:8080/read/next', {
      params: {
        pageId: page.value?.id,
      },
    });

    if (!response.data) {
      throw Error('Страница не найдена');
    }

    page.value = response.data;

    router.push({
      query: { pageNumber: response.data.pageNumber },
    });
  } catch (error) {
    console.error('Ошибка при загрузке следующей страницы:', error);
  }
}

async function prevPage() {
  try {
    const response = await axios.get<Page>('http://localhost:8080/read/prev', {
      params: {
        pageId: page.value?.id,
      },
    });

    if (!response.data) {
      throw Error('Страница не найдена');
    }

    page.value = response.data;

    router.push({
      query: { pageNumber: response.data.pageNumber },
    });
  } catch (error) {
    console.error('Ошибка при загрузке предыдущей страницы:', error);
  }
}
</script>
