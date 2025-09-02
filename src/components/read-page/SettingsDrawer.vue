<template>
  <transition name="slide">
    <div v-if="visible" class="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-6 border-l border-gray-200 z-40">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold">Настройки</h3>
        <button @click="close" class="text-gray-500 hover:text-gray-700">&times;</button>
      </div>
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Шрифт</label>
          <select v-model="font"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="lora">Lora</option>
            <option value="arial">Arial</option>
            <option value="times">Times New Roman</option>
            <!-- Добавьте больше шрифтов по необходимости -->
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Размер текста</label>
          <input type="range" v-model="textSize" min="16" max="32" step="2" class="w-full">
          <div class="text-center text-sm text-gray-500 mt-1">{{ textSize }}px</div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Тема</label>
          <div class="flex space-x-3">
            <button @click="theme = 'light'" class="px-4 py-2 rounded-md"
              :class="theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'">Светлая</button>
            <button @click="theme = 'dark'" class="px-4 py-2 rounded-md"
              :class="theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'">Темная</button>
            <button @click="theme = 'book'" class="px-4 py-2 rounded-md"
              :class="theme === 'book' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'">Книжная</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useSettings } from '@/composables/useSettings';

defineProps<{
  visible: boolean;
}>()

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void;
}>()

function close() {
  emit('update:visible', false)
}

// Используем общие настройки из composable
const { font, textSize, theme } = useSettings()
</script>
