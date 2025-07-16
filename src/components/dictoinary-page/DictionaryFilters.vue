<template>
  <div class="flex flex-wrap gap-4 items-center">
    <div class="relative w-full md:w-auto">
      <select :value="sortOption" @change="handleChange"
        class="appearance-none w-full md:w-64 px-4 py-2 pr-10 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A9A8FD] focus:border-transparent">
        <option value="date">По дате добавления (новые)</option>
        <option value="alphabet">По алфавиту (А-Я)</option>
        <option value="review">По дате повторения</option>
        <option value="difficulty">По сложности</option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </div>
    </div>

    <div class="flex gap-2 flex-wrap">
      <button v-for="(filter, index) in filters" :key="index" @click="$emit('toggle-filter', filter)"
        :class="{ 'bg-[#A9A8FD] text-white': activeFilters.includes(filter), 'bg-gray-100 text-gray-700': !activeFilters.includes(filter) }"
        class="px-4 py-2 rounded-lg transition-colors">
        {{ filter }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  sortOption: { type: String, required: true },
  filters: { type: Array as () => string[], required: true },
  activeFilters: { type: Array as () => string[], required: true }
});

const emit = defineEmits(['toggle-filter', 'update:sortOption']);

const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  emit('update:sortOption', target.value);
};
</script>
