<template>
  <div class="mt-[40px] w-full max-w-[1205px] mx-auto px-4 transition-all duration-300">
    <div class="text-center text-[32px] font-lora text-[#000000] opacity-59 mb-8">
      {{ title }}
    </div>
    <div class="text-[26px] font-lora leading-[157%] tracking-[0.09em] text-justify text-[#000000]">
      <p class="indent-[40px]" v-for="(sentence, i) in sentences" :key="i">
        <template v-for="(part, j) in split(sentence.originalText)" :key="j">
          <span @mouseover="onHover(i, j, $event)" @mouseleave="onHover(null, null, $event)"
            @click="onClick(i, j, $event)"
            :class="['transition-colors', isHighlighted(i, j) ? 'bg-[#A9A8FD] rounded-md' : '', 'cursor-pointer']">
            {{ part }}
          </span>
        </template>
        <span> </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Sentence } from '@/types/Sentence';

defineProps<{
  sentences: Sentence[];
  title?: string;
  split: (text: string) => string[];
  onHover: (i: number | null, j: number | null, e: MouseEvent) => void;
  onClick: (i: number, j: number, e: MouseEvent) => void;
  isHighlighted: (i: number, j: number) => boolean;
}>();
</script>
