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
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import BookList from '@/components/BookList.vue';
import AppFooter from '@/components/AppFooter.vue';
import type { Genre } from '@/types/Genre';

const route = useRoute();
const router = useRouter();

const books = ref([]);
const genres = ref<Genre[]>([]);
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

const fetchGenres = async () => {
  try {
    const response = await axios.get('http://localhost:8080/genres');
    genres.value = response.data;
  } catch (error) {
    console.error('Ошибка загрузки жанров:', error);
  }
};

const fetchBooks = async () => {
  try {
    const response = await axios.get('http://localhost:8080/books', {
      params: {
        title: route.query.title,
        genres: route.query.genres,
        level: route.query.level,
        sort: currentSort.value
      }
    });
    books.value = response.data;
  } catch (error) {
    console.error('Ошибка загрузки книг:', error);
  }
};

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

onMounted(() => {
  fetchGenres();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(() => route.query, fetchBooks, { immediate: true });
</script>
