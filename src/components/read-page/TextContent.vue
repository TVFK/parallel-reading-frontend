<template>
  <div class="mt-[40px] w-full max-w-[1205px] mx-auto px-4 transition-all duration-300" :class="themeClasses">
    <div class="text-center text-[32px] font-lora opacity-59 mb-8" :class="titleClasses">
      {{ title }}
    </div>
    <div class="leading-[157%] tracking-[0.09em] text-justify"
      :class="[`text-[${textSize}px]`, `font-${font}`, textClasses]">
      <p class="indent-[40px]" v-for="(sentence, i) in sentences" :key="i">
        <template v-for="(part, j) in split(sentence.originalText)" :key="j">
          <span @mouseover="onHover(i, j, $event)" @mouseleave="onHover(null, null, $event)"
            @click.stop="onClick(i, j, $event)"
            :class="['transition-colors', isHighlighted(i, j) ? highlightClass : '', 'cursor-pointer']">
            {{ part }}
          </span>
        </template>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sentence } from '@/types/Sentence';
import { computed } from 'vue';

const props = defineProps<{
  sentences: Sentence[];
  title?: string;
  split: (text: string) => string[];
  onHover: (i: number | null, j: number | null, e: MouseEvent) => void;
  onClick: (i: number, j: number, e: MouseEvent) => void;
  isHighlighted: (i: number, j: number) => boolean;
  font: string;
  textSize: number;
  theme: string;
}>();

// Вычисляем классы на основе темы
const themeClasses = computed(() => {
  switch (props.theme) {
    case 'dark': return 'bg-gray-900';
    case 'book': return 'bg-yellow-50';
    default: return 'bg-white';
  }
});

const textClasses = computed(() => {
  switch (props.theme) {
    case 'dark': return 'text-white';
    case 'book': return 'text-yellow-900';
    default: return 'text-[#000000]';
  }
});

const titleClasses = computed(() => {
  switch (props.theme) {
    case 'dark': return 'text-gray-300 opacity-80';
    case 'book': return 'text-yellow-800 opacity-70';
    default: return 'text-[#000000] opacity-59';
  }
});

const highlightClass = computed(() => {
  switch (props.theme) {
    case 'dark': return 'bg-indigo-700 rounded-md';
    case 'book': return 'bg-yellow-200 rounded-md';
    default: return 'bg-[#A9A8FD] rounded-md';
  }
});
</script>
