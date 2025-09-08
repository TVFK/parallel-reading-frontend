<template>
  <div @click="navigateToReview"
    class="cursor-pointer relative w-full max-w-[300px] h-[470px] bg-[#D9D9D9] rounded-[44px] overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg hover:z-10 transform-origin-center">
    <img :src="bookImageUrl" alt="book image" class="w-full h-[380px] object-cover" />

    <div
      class="absolute inset-x-0 bottom-0 h-[90px] bg-[#D9D9D9] flex flex-col items-center justify-center text-center px-4">
      <div class="font-lora text-[20px] font-semibold leading-[120%] text-black line-clamp-2">
        {{ book.title }}
      </div>
      <div class="font-lora text-[20px] font-semibold leading-[120%] text-black line-clamp-1">
        {{ book.level }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Book } from '@/types/Book';
import { computed } from 'vue';
import router from '@/router';
import { useBookContextStore } from '@/stores/BookContextStore';

const props = defineProps({
  book: {
    type: Object as () => Book,
    required: true,
  }
});

const bookImageUrl = computed(() => {
  return props.book ? `/minio/covers/${props.book.imageKey}` : '';
});

const bookContextStore = useBookContextStore();

const navigateToReview = () => {
  bookContextStore.setCurrentBook(props.book);
  router.push(`/books/review/${props.book.title}`)
}
</script>
