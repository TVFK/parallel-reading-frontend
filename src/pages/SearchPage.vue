<template>
  <NavBar />
  <div class="container mx-auto mt-20 px-4">
    <div class="flex flex-wrap items-center gap-4 mb-6">
      <select :value="currentSort" @change="updateSort" class="p-2 border rounded cursor-pointer">
        <option value="publishedYear,asc">По дате выпуска</option>
        <option value="level,asc">По сложности</option>
      </select>

      <select :value="currentLevel" @change="updateLevel" class="p-2 border rounded cursor-pointer">
        <option value="">Все уровни</option>
        <option v-for="level in levels" :key="level" :value="level">{{ level }}</option>
      </select>

      <div class="relative">
        <button ref="genreButton" @click="toggleGenreDropdown" class="p-2 border rounded cursor-pointer">
          {{ genresText }}
        </button>
        <div v-if="showGenreDropdown" ref="genreDropdown"
          class="absolute z-10 p-2 mt-2 bg-white border rounded shadow-lg w-48">
          <div v-for="genre in genres" :key="genre.id" @click="toggleGenre(genre.name)" :class="[
            'px-3 py-2 rounded cursor-pointer',
            selectedGenres.includes(genre.name)
              ? 'bg-[#A9A8FD] text-white'
              : 'hover:bg-gray-100'
          ]">
            {{ genre.name }}
          </div>
          <button v-if="selectedGenres.length" @click="resetGenres"
            class="mt-2 text-red-500 w-full text-center cursor-pointer">
            Сбросить
          </button>
        </div>
      </div>
    </div>

    <div v-if="selectedGenres.length" class="flex flex-wrap gap-2 mb-4">
      <span v-for="genre in selectedGenres" :key="genre"
        class="px-3 py-1 bg-[#A9A8FD] text-white rounded-full text-sm flex items-center">
        {{ genre }}
        <button @click="toggleGenre(genre)" class="ml-2 text-white font-bold cursor-pointer">
          ×
        </button>
      </span>
    </div>

    <BookList :bookList="books" layout="grid" />
  </div>
  <AppFooter />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import BookList from '@/components/BookList.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useGenresStore } from '@/stores/GenreStore';
import { useBooksStore } from '@/stores/BooksStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();

const genresStore = useGenresStore();
const booksStore = useBooksStore();

const { books } = storeToRefs(booksStore);
const { genres } = storeToRefs(genresStore);
const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
const showGenreDropdown = ref(false);
const genreDropdown = ref<HTMLElement | null>(null);
const genreButton = ref<HTMLElement | null>(null);

const currentSort = computed(() => route.query.sort?.toString() || 'publishedYear,asc');
const currentLevel = computed(() => route.query.level?.toString() || '');
const selectedGenres = computed(() =>
  (route.query.genres?.toString() || '').split(',').filter(Boolean)
);
const genresText = computed(() =>
  selectedGenres.value.length ? selectedGenres.value.join(', ') : 'Выберите жанры'
);

const updateQuery = (params: Record<string, string | undefined>) => {
  router.push({
    query: {
      ...route.query,
      ...params
    }
  });
};

const updateSort = (e: Event) =>
  updateQuery({ sort: (e.target as HTMLSelectElement).value });

const updateLevel = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value;
  updateQuery({ level: value || undefined });
};

const toggleGenre = (genre: string) => {
  const newGenres = selectedGenres.value.includes(genre)
    ? selectedGenres.value.filter(g => g !== genre)
    : [...selectedGenres.value, genre].slice(0, 2);

  updateQuery({ genres: newGenres.join(',') || undefined });
};

const resetGenres = () => updateQuery({ genres: undefined });

const toggleGenreDropdown = () => {
  showGenreDropdown.value = !showGenreDropdown.value;
};

const handleClickOutside = (e: MouseEvent) => {
  if (!genreDropdown.value?.contains(e.target as Node) &&
    !genreButton.value?.contains(e.target as Node)) {
    showGenreDropdown.value = false;
  }
};

onMounted(async () => {
  genresStore.fetchGenres();
  booksStore.fetchBooks({
    title: route.query.title?.toString(),
    genres: route.query.genres?.toString(),
    level: route.query.level?.toString(),
    sort: route.query.sort?.toString()
  });
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(() => route.query, (query) => {
  booksStore.fetchBooks({
    title: query.title?.toString(),
    genres: query.genres?.toString(),
    level: query.level?.toString(),
    sort: query.sort?.toString()
  });
}, { immediate: true });

</script>
