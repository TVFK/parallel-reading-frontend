<template>
  <NavBar />
  <div class="w-full mt-20">

    <div class="container mx-auto px-4 mb-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 class="text-3xl font-bold text-[#2D2D2D]">
          Книги по уровням
          <span class="block mt-1 w-12 h-1 bg-[#A9A8FD]"></span>
        </h1>

        <button @click="navigateToSearch"
          class="cursor-pointer flex items-center gap-2 px-6 py-3 bg-[#A9A8FD] hover:bg-[#9493F0] text-white rounded-lg transition-all shadow-md hover:shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Расширенный поиск
        </button>
      </div>
    </div>

    <div class="w-full mt-5 space-y-16 mb-5">
      <div v-for="books in booksWithLevels" :key="books.level">
        <h1 class="text-center font-arial text-[32px] font-bold leading-[140%] text-black mb-4">
          {{ books.level }}
        </h1>
        <div class="w-full h-[1px] bg-gray-500 mb-8"></div>
        <BookList :bookList="books.books" layout="horizontal" />
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import NavBar from '@/components/NavBar.vue';
import BookList from '@/components/BookList.vue';
import { useBooksStore } from '@/stores/BooksStore';
import { useRouter } from 'vue-router';
import { computed, onMounted } from 'vue';

const booksStore = useBooksStore();
const router = useRouter();
const levels = [
  "Beginner A1 - Начинающий",
  "Pre-intermediate A2 - Элементарный уровень",
  "Intermediate B1 - Средний уровень",
  "Upper-intermediate B2 - Пороговый продвинутый уровень",
  "Advanced C1 - Продвинутый уровень"
]

const booksWithLevels = computed(() => {
  return levels.map((level, index) => ({
    level,
    books: booksStore.sortedBooks[index] || []
  }));
});

const navigateToSearch = () => {
  router.push('/search');
};

onMounted(async () => {
  if (Object.keys(booksStore.sortedBooks).length === 0) {
    await booksStore.fetchSortedBooks();
  }
})

</script>
