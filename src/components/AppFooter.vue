<template>
  <footer class="w-full bg-gray-300 flex items-center justify-between px-6 py-4 mt-auto">
    <div class="flex space-x-3">
      <div @click="handleRickRoll">
        <IconVk class="w-8 h-8 cursor-pointer" />
      </div>
      <div @click="handleRickRoll">
        <IconTg class="w-8 h-8 cursor-pointer" />
      </div>
      <div @click="handleRickRoll">
        <IconMail class="w-8 h-8 cursor-pointer" />
      </div>
    </div>

    <div class="text-center text-sm">
      <div @click="$router.push('/about')" class="hover:underline cursor-pointer">О проекте</div>
      <div>Copyright © 2003-2025 Boolkus</div>
    </div>

    <div class="text-right text-sm">
      <div @click="$router.push('/about')" class="hover:underline cursor-pointer">Пользовательское соглашение</div>
      <div @click="$router.push('/about')" class="hover:underline cursor-pointer">Политика конфиденциальности</div>
    </div>
  </footer>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import IconMail from './icons/IconMail.vue';
import IconTg from './icons/IconTg.vue';
import IconVk from './icons/IconVk.vue';

const rickRollCount = ref(0);

// TODO добавить сохранение количество зарикроленных людей на бэке
const handleRickRoll = () => {
  rickRollCount.value++;
  window.open("https://rutube.ru/video/f3b615db135287a64584737e664e1e4b/", '_blank')
}
</script>
