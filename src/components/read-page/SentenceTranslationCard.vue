<template>
  <div v-if="show" class="fixed z-50 p-4 bg-white border rounded-lg shadow-lg max-w-[300px]"
    :style="{ left: `${x}px`, top: `${y + 20}px` }">
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error" class="text-red-500">Ошибка перевода</div>
    <div v-else class="space-y-2">
      <div class="font-medium border-b pb-1">{{ original }}</div>
      <div>{{ text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ show: boolean; x: number; y: number; loading: boolean; error: boolean; original: string; text: string }>();
</script>
