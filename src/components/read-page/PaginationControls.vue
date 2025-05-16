<template>
  <div class="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex items-center space-x-6">
    <button @click="$emit('prev')" :disabled="page <= 1" class="p-2 disabled:opacity-50">&lt;</button>
    <span class="text-lg font-medium">Page {{ page }} of {{ total }}</span>
    <button @click="$emit('next')" :disabled="page >= total" class="p-2 disabled:opacity-50">&gt;</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ page: number; total: number }>();
const emit = defineEmits<{
  (e: 'next'): void;
  (e: 'prev'): void;
}>();
</script>
