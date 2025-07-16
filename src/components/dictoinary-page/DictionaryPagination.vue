<template>
  <nav class="flex items-center gap-1">
    <button @click="$emit('prev-page')" class="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
      &laquo;
    </button>
    <button v-for="page in totalPages" :key="page" @click="$emit('change-page', page)"
      :class="{ 'bg-[#A9A8FD] text-white': page === currentPage, 'text-gray-700 hover:bg-gray-100': page !== currentPage }"
      class="w-10 h-10 rounded-lg transition-colors">
      {{ page }}
    </button>
    <button @click="$emit('next-page')" class="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
      &raquo;
    </button>
  </nav>
</template>

<script setup lang="ts">
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

defineEmits(['change-page', 'prev-page', 'next-page']);
</script>
