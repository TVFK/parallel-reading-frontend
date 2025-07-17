<template>
  <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
    <h1 class="text-3xl font-bold text-[#2D2D2D]">
      Мой словарь
      <span class="block mt-1 w-12 h-1 bg-[#A9A8FD]"></span>
    </h1>

    <div class="flex gap-3">
      <router-link to="/dictionary/create"
        class="cursor-pointer flex items-center gap-2 px-6 py-3 bg-white border border-[#A9A8FD] text-[#5E5DF0] rounded-lg transition-all shadow-md hover:shadow-lg hover:bg-[#F0F0FF]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Создать карточку
      </router-link>

      <button @click="$emit('start-learning')"
        class="cursor-pointer flex items-center gap-2 px-6 py-3 bg-[#A9A8FD] hover:bg-[#9493F0] text-white rounded-lg transition-all shadow-md hover:shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Учить слова
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['start-learning']);
</script>
