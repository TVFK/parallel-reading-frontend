<template>
  <transition name="slide">
    <div v-if="visible" class="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6 border-l border-gray-200 z-40">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold">Главы</h3>
        <button @click="close" class="text-gray-500 hover:text-gray-700">&times;</button>
      </div>
      <ul class="space-y-2 overflow-auto">
        <li v-for="chap in chapters" :key="chap.id" @click="select(chap.id)"
          class="cursor-pointer hover:scale-105 transition-transform">
          {{ chap.title }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { Chapter } from '@/types/Chapter';

defineProps<{
  visible: boolean;
  chapters: Chapter[];
}>();
const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
  (e: 'select', id: number): void;
}>();

function close() {
  emit('update:visible', false);
}
function select(id: number) {
  emit('select', id);
  emit('update:visible', false);
}
</script>
