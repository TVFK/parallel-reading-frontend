<template>
  <input v-model="model" class="border border-gray-400 rounded-md focus:outline-none focus:ring-1" type="text">
</template>

<script setup lang="ts">
defineOptions({
  name: 'MyInput'
})

const model = defineModel<string | number>({ required: true })
</script>
