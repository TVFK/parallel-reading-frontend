<template>
  <div class="relative min-h-screen">
    <NavBar />

    <main class="container mx-auto px-4 pt-24">
      <h1 class="text-center text-3xl font-lora font-normal mb-4">
        «{{ book?.title }}» на английском языке с параллельным переводом
      </h1>

      <div class="border-t border-black opacity-55 w-full mb-8"></div>

      <div v-if="loading" class="text-center">Загрузка...</div>
      <div v-else-if="error" class="text-center text-red-500">Ошибка: {{ error }}</div>

      <div v-else class="flex flex-col lg:flex-row gap-8">
        <!-- TODO Сделать сохранение последней посещенной страницы -->
        <div class="flex flex-col items-center lg:items-start">
          <img :src="bookImageUrl" :alt="`Обложка книги ${book?.title}`" class="w-80 h-auto rounded-lg shadow-lg" />
          <DefaultButton @click="$router.push({ path: `/books/${book?.title}`, query: { pageNumber: 1 } })"
            class="hover:bg-[#9493F0] w-80 mt-4 text-2xl px-8 py-2 transform transition-transform hover:scale-105">
            Читать
          </DefaultButton>
        </div>

        <div class="flex-1 flex flex-col gap-8">
          <div class="bg-gray-200 p-6 rounded-2xl flex items-center justify-center w-96 mx-auto">
            <div class="text-center">
              <h2 class="font-lora font-semibold text-2xl mb-4">
                «{{ book?.title }}» - {{ book?.level }}
              </h2>
              <div class="border-t border-black mb-4"></div>
              <p class="font-lora text-lg leading-relaxed">
                Автор: {{ book?.author }}<br />
                Год: {{ book?.publishedYear }}<br />
                Сложность: {{ book?.level }}<br />
                Количество страниц: {{ book?.numberOfPage }}
              </p>
            </div>
          </div>

          <div class="bg-gray-200 p-6 rounded-2xl">
            <p class="font-lora text-lg text-justify indent-10 leading-relaxed">
              {{ book?.description }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="!loading && !error" class="bg-gray-200 p-6 rounded-2xl mt-8">
        <div class="flex flex-wrap gap-4 justify-center">
          <div @click="$router.push({ path: '/search', query: { genres: genre.name } })" v-for="genre in book?.genres"
            :key="genre.id"
            class="bg-[#A9A8FD] hover:bg-[#9493F0] text-white font-lora text-xl px-6 py-2 rounded-full cursor-pointer transform transition-transform hover:scale-105">
            {{ genre.name }}
          </div>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import AppFooter from '@/components/AppFooter.vue';
import NavBar from '@/components/NavBar.vue';
import type { Book } from '@/types/Book';
import DefaultButton from '@/components/UI/DefaultButton.vue';
import { useBookContextStore } from '@/stores/BookContextStore';

const route = useRoute();
const book = ref<Book | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const bookImageUrl = computed(() => {
  return book.value ? `http://localhost:8080/${book.value.imageUrl}` : '';
});
const bookContextStore = useBookContextStore();

onMounted(async () => {
  if (bookContextStore.currentBook?.title !== route.params.bookTitle) {
    await bookContextStore.fetchBookByTitle(route.params.bookTitle as string);
  }
  book.value = bookContextStore.currentBook;
  loading.value = false;
});

</script>
