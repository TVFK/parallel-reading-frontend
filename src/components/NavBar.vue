<template>
  <nav class="fixed top-0 left-0 right-0 h-16 flex items-center bg-white shadow-md z-50 px-6">
    <div @click="$router.push('/')" class="cursor-pointer flex items-center space-x-2">
      <IconLogo class="w-8 h-8 bg-white rounded-lg shadow-md" />
      <span class="font-bold text-xl text-black">Boolkus</span>
    </div>

    <div
      class="absolute left-1/2 -translate-x-1/2 flex items-center bg-[#A9A8FD] rounded-full w-[600px] h-10 pr-2 transition-all"
      :class="{ 'ring-2 ring-[#5A57FB]': isFocused }">
      <input type="text" v-model="searchQuery" placeholder="Искать на bulkus"
        class="flex-grow h-full bg-gray-300 placeholder-gray-400 text-sm px-3 rounded-full focus:outline-none"
        @focus="isFocused = true" @blur="isFocused = false" @keyup.enter="search" />
      <div class="flex items-center gap-1">
        <button v-if="searchQuery" @click="clearSearch"
          class="text-gray-500 hover:text-gray-700 px-2 transition-colors">
          ×
        </button>
        <IconLoupe class="cursor-pointer w-5 h-5" @click="search" />
      </div>
    </div>

    <div class="flex items-center space-x-8 ml-auto">
      <div @click="$router.push('/books')"
        class="cursor-pointer flex flex-col items-center text-sm hover:scale-105 transition-transform">
        <IconCatalog class="w-8 h-8 text-gray-800" />
        <span>Каталог</span>
      </div>

      <div @click="$router.push('/dictionary')"
        class="cursor-pointer flex flex-col items-center text-sm hover:scale-105 transition-transform">
        <IconMyBooks class="w-8 h-8 text-gray-800" />
        <span>Словарь</span>
      </div>

      <div @click="$router.push('/login')"
        class="cursor-pointer flex flex-col items-center text-sm hover:scale-105 transition-transform">
        <IconProfile class="w-8 h-8 text-gray-800" />
        <span>Войти</span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconCatalog from './icons/IconCatalog.vue';
import IconLogo from './icons/IconLogo.vue';
import IconMyBooks from './icons/IconMyBooks.vue';
import IconProfile from './icons/IconProfile.vue';
import IconLoupe from './icons/IconLoupe.vue';

const router = useRouter();
const route = useRoute();
const searchQuery = ref(route.query.title?.toString() || '');
const isFocused = ref(false);

watch(
  () => route.query.title,
  (newTitle) => {
    if (newTitle !== searchQuery.value) {
      searchQuery.value = newTitle?.toString() || '';
    }
  }
);

const search = () => {
  const query = searchQuery.value.trim();
  if (query) {
    router.push({
      path: '/search',
      query: { ...route.query, title: query }
    });
  } else if (route.path === '/search') {
    const { title, ...restQuery } = route.query;
    router.replace({ path: '/search', query: restQuery });
  }
};

const clearSearch = () => {
  searchQuery.value = '';
  if (route.path === '/search') {
    const { title, ...restQuery } = route.query;
    router.replace({ path: '/search', query: restQuery });
  }
};
</script>
