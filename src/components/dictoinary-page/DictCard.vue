<template>
  <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
    <div class="flex justify-between items-start">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">{{ word.word }}</h2>
        <p class="text-lg text-[#5E5DF0] mt-1">{{ word.translation }}</p>
      </div>
      <div class="flex gap-2">
        <button @click="$emit('edit')" class="cursor-pointer text-gray-400 hover:text-[#A9A8FD] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button @click="$emit('delete')" class="cursor-pointer text-gray-400 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <div class="mt-4">
      <p class="text-gray-600 font-medium">Контекст:</p>
      <p class="text-gray-700 italic mt-1">"{{ word.context }}"</p>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <span v-for="(tag, tagIndex) in word.tags" :key="tagIndex"
        class="px-3 py-1 bg-[#F0F0FF] text-[#5E5DF0] text-xs rounded-full">
        {{ tag }}
      </span>
    </div>

    <div class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm text-gray-500">{{ word.createdAt }}</span>
      </div>
      <div class="flex items-center">
        <span class="text-sm text-gray-500 mr-2">Сложность:</span>
        <div class="flex">
          <svg v-for="i in 3" :key="i" xmlns="http://www.w3.org/2000/svg"
            :class="{ 'text-yellow-400': i <= word.difficulty, 'text-gray-300': i > word.difficulty }" class="h-4 w-4"
            viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DictionaryCard } from '@/types/DictionaryCard';

defineProps({
  word: {
    type: Object as () => DictionaryCard,
    required: true
  }
});

defineEmits(['edit', 'delete']);
</script>
