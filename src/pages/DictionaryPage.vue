<template>
  <NavBar />
  <div class="w-full mt-20">
    <div class="container mx-auto px-4 mb-8">
      <DictionaryHeader @start-learning="startLearning" />

      <DictionaryFilters v-model:sortOption="sortOption" :filters="filters" :active-filters="activeFilters"
        @toggle-filter="toggleFilter" class="mt-8" />

      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DictCard v-for="(word, index) in words" :key="index" :word="word" @edit="editWord(word)"
          @delete="deleteWord(word)" />
      </div>

      <div class="mt-12 flex justify-center">
        <DictionaryPagination :current-page="currentPage" :total-pages="5" @change-page="changePage"
          @prev-page="prevPage" @next-page="nextPage" />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import NavBar from '@/components/NavBar.vue';
import DictionaryHeader from '@/components/dictoinary-page/DictionaryHeader.vue';
import DictionaryFilters from '@/components/dictoinary-page/DictionaryFilters.vue';
import DictCard from '@/components/dictoinary-page/DictCard.vue';
import DictionaryPagination from '@/components/dictoinary-page/DictionaryPagination.vue';
import type { DictionaryCard } from '@/types/DictionaryCard';
import { onMounted, ref } from 'vue';
import { useDictionaryStore } from '@/stores/DictionaryStore';

const dictionaryStore = useDictionaryStore()

// Фильтры и сортировка
const sortOption = ref('date');
const currentPage = ref(1);
const filters = ['Глаголы', 'Существительные', 'Прилагательные', 'Идиомы', 'Для повторения'];
const activeFilters = ref<string[]>([]);
const words = ref<DictionaryCard[]>([])

onMounted(async () => {
  await dictionaryStore.fetchDictionaryCards()
  words.value = dictionaryStore.dictionaryCards
})
// // Заглушки данных
// const words = ref<DictionaryCard[]>([
//   {
//     id: 1,
//     word: "elaborate",
//     translation: "тщательно разработанный",
//     context: "The company has an elaborate security system.",
//     createdAt: "15.05.2024",
//     nextReview: "22.05.2024",
//     difficulty: 2,
//     tags: ["прилагательное", "формальный"]
//   },
//   {
//     id: 1,
//     word: "dwindle",
//     translation: "постепенно уменьшаться",
//     context: "Resources have dwindled to a critical level.",
//     createdAt: "12.05.2024",
//     nextReview: "19.05.2024",
//     difficulty: 3,
//     tags: ["глагол"]
//   },
//   {
//     id: 1,
//     word: "benevolent",
//     translation: "доброжелательный",
//     context: "He gave a benevolent smile to the children.",
//     createdAt: "10.05.2024",
//     nextReview: "17.05.2024",
//     difficulty: 1,
//     tags: ["прилагательное", "характер"]
//   },
//   {
//     id: 1,
//     word: "scrutinize",
//     translation: "тщательно изучать",
//     context: "The committee will scrutinize all proposals.",
//     createdAt: "08.05.2024",
//     nextReview: "15.05.2024",
//     difficulty: 3,
//     tags: ["глагол", "формальный"]
//   },
//   {
//     id: 1,
//     word: "ubiquitous",
//     translation: "вездесущий",
//     context: "Mobile phones are now ubiquitous in modern society.",
//     createdAt: "05.05.2024",
//     nextReview: "12.05.2024",
//     difficulty: 2,
//     tags: ["прилагательное"]
//   },
//   {
//     id: 1,
//     word: "meticulous",
//     translation: "дотошный",
//     context: "She is meticulous about keeping records.",
//     createdAt: "02.05.2024",
//     nextReview: "09.05.2024",
//     difficulty: 2,
//     tags: ["прилагательное", "характер"]
//   }
// ]);

// Методы
const startLearning = () => {
  console.log('Начать обучение словам');
};

const toggleFilter = (filter: string) => {
  if (activeFilters.value.includes(filter)) {
    activeFilters.value = activeFilters.value.filter(f => f !== filter);
  } else {
    activeFilters.value.push(filter);
  }
};

const editWord = (word: DictionaryCard) => {
  console.log('Редактировать слово:', word);
};

const deleteWord = (word: DictionaryCard) => {
  console.log('Удалить слово:', word);
};

const changePage = (page: number) => {
  currentPage.value = page;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < 5) {
    currentPage.value++;
  }
};
</script>

<style scoped>
.card-enter-active,
.card-leave-active {
  transition: all 0.4s ease;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
