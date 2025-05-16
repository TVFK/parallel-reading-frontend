<template>
  <div
    class="fixed top-0 left-0 w-full h-[40px] bg-white border-b shadow-md flex items-center justify-between px-4 z-30">
    <div class="flex items-center space-x-2 cursor-pointer">
      <span @click="goToCatalog" class="text-[20px] font-arial text-[#292D32]">Каталог</span>
      <IconArrow class="w-[6.82px] h-[15px]" />
      <span v-if="book" @click="goToReview" class="text-[20px] font-arial text-[#292D32]">{{ book.title }}</span>
      <IconArrow v-if="chapter" class="w-[6.82px] h-[15px]" />
      <span v-if="chapter" class="text-[20px] font-arial text-[#292D32]">{{ chapter.title }}</span>
    </div>
    <div class="flex items-center space-x-4">
      <IconStructure @click="$emit('toggle-chapters')" class="w-[25px] h-[25px] cursor-pointer hover:opacity-80" />
      <IconSettings @click="$emit('toggle-settings')" class="w-[25px] h-[25px] cursor-pointer hover:opacity-80" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import IconArrow from '@/components/icons/IconArrow.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import IconStructure from '@/components/icons/IconStructure.vue';
import type { Book } from '@/types/Book';
import type { Chapter } from '@/types/Chapter';

const props = defineProps<{ book: Book | null; chapter: Chapter | null }>();
const emit = defineEmits<{
  (e: 'toggle-chapters'): void;
  (e: 'toggle-settings'): void;
}>();

const router = useRouter();
function goToCatalog() {
  router.push('/books');
}
function goToReview() {
  if (props.book) router.push(`/books/review/${props.book.title}`);
}
</script>
