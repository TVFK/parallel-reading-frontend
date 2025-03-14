<template>
  <button class="text-white bg-[#A9A8FD] border font-lora rounded-full cursor-pointer">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultButton'
})
</script>
