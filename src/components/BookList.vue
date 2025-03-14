<template>
  <div class="w-full">
    <!-- Горизонтальный режим -->
    <div v-if="layout === 'horizontal'" class="relative">
      <button @click="scrollLeft"
        class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
        <IconArrow class="w-6 h-6 transform rotate-180" />
      </button>

      <div ref="bookContainer" class="flex overflow-x-auto scroll-smooth px-12 gap-8 py-4"
        style="scrollbar-width: none;">
        <div v-for="(book, index) in bookList" :key="index" class="flex-shrink-0 w-[300px]">
          <BookItem :book="book" />
        </div>
      </div>

      <button @click="scrollRight"
        class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
        <IconArrow class="w-6 h-6" />
      </button>
    </div>

    <!-- Режим сетки -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      <div v-for="(book, index) in bookList" :key="index" class="flex justify-center">
        <BookItem :book="book" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';
import BookItem from './BookItem.vue';
import IconArrow from './icons/IconArrow.vue';
import type { Book } from '@/types/Book';

defineProps({
  bookList: {
    type: Array as PropType<Book[]>,
    required: true,
  },
  layout: {
    type: String as () => 'horizontal' | 'grid',
    default: 'horizontal',
  },
});

const bookContainer = ref<HTMLElement | null>(null);

const scrollLeft = () => {
  if (bookContainer.value) {
    bookContainer.value.scrollBy({ left: -320, behavior: 'smooth' });
  }
};

const scrollRight = () => {
  if (bookContainer.value) {
    bookContainer.value.scrollBy({ left: 320, behavior: 'smooth' });
  }
};
</script>
