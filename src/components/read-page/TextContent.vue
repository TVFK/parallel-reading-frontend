<template>
  <div class="mt-[40px] w-full max-w-[1205px] mx-auto px-4 transition-all duration-300 text-content">
    <div class="text-center text-[32px] font-lora opacity-59 mb-8">
      {{ title }}
    </div>
    <div class="leading-[157%] tracking-[0.09em] text-justify text-content">
      <p class="indent-[40px]" v-for="(sentence, i) in sentences" :key="i">
        <template v-for="(part, j) in split(sentence.originalText)" :key="j">
          <span @mouseover="onHover(i, j, $event)" @mouseleave="onHover(null, null, $event)"
            @click.stop="onClick(i, j, $event)"
            :class="['transition-colors', isHighlighted(i, j) ? 'bg-[#A9A8FD] rounded-md' : '', 'cursor-pointer']">
            {{ part }}
          </span>
        </template>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sentence } from '@/types/Sentence';

const props = defineProps<{
  sentences: Sentence[];
  title?: string;
  split: (text: string) => string[];
  onHover: (i: number | null, j: number | null, e: MouseEvent) => void;
  onClick: (i: number, j: number, e: MouseEvent) => void;
  isHighlighted: (i: number, j: number) => boolean;
}>();
</script>
