<template>
  <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 px-4 py-2 rounded-full shadow-lg z-30">
    Page {{ page }} of {{ total }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ page: number; total: number }>();
</script>
