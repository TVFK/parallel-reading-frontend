<!-- DictionaryPagination.vue -->
<template>
  <nav class="flex items-center gap-1">
    <button @click="$emit('prev-page')" :disabled="currentPage === 0"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage === 0 }"
      class="cursor-pointer p-2 rounded-lg text-gray-500 hover:bg-gray-100">
      &laquo;
    </button>

    <button v-for="pageNumber in totalPages" :key="pageNumber" @click="$emit('change-page', pageNumber)" :class="{
      'bg-[#A9A8FD] text-white': pageNumber === currentPage + 1,
      'text-gray-700 hover:bg-gray-100': pageNumber !== currentPage + 1
    }" class="cursor-pointer w-10 h-10 rounded-lg transition-colors">
      {{ pageNumber }}
    </button>

    <button @click="$emit('next-page')" :disabled="currentPage === totalPages - 1"
      :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages - 1 }"
      class="cursor-pointer p-2 rounded-lg text-gray-500 hover:bg-gray-100">
      &raquo;
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
});

defineEmits(['change-page', 'prev-page', 'next-page']);
</script>
