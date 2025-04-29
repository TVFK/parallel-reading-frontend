<template>
  <footer class="w-full bg-gray-300 flex items-center justify-between px-6 py-4 mt-auto">
    <div class="flex space-x-3">
      <IconVk class="w-8 h-8" />
      <IconTg class="w-8 h-8" />
      <IconMail class="w-8 h-8" />
    </div>

    <div class="text-center text-sm">
      <div @click="$router.push('/about')" class="hover:underline cursor-pointer">О проекте</div>
      <div>Copyright © 2003-2025 Boolkus</div>
    </div>

    <div class="text-right text-sm">
      <div class="hover:underline cursor-pointer">Пользовательское соглашение</div>
      <div class="hover:underline cursor-pointer">Политика конфиденциальности</div>
    </div>
  </footer>
</template>


<script setup lang="ts">
import IconMail from './icons/IconMail.vue';
import IconTg from './icons/IconTg.vue';
import IconVk from './icons/IconVk.vue';
</script>
