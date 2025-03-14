<template>
  <div class="relative min-h-screen bg-white">
    <NavBar />

    <main class="w-full">
      <div class="w-full h-[227px] bg-[#E6E6E6] flex flex-col justify-center items-center mt-16">
        <h1 class="text-center font-arial text-[36px] font-bold leading-[140%] text-black mb-4">
          Адаптивные книги на английском языке с параллельным переводом
        </h1>
        <div class="text-center font-arial text-[24px] font-bold leading-[140%] text-black max-w-[903px]">
          Изучайте английский язык, читая адаптивные книги по уровням. Наличие параллельного перевода сделает это ещё
          более эффективным.
        </div>
      </div>

      <div class="w-full bg-white py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-center font-arial text-[32px] font-bold leading-[140%] text-black mb-8">
            Почему выбирают нас?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <h3 class="font-arial text-[24px] font-bold text-black mb-4">Адаптивные книги</h3>
              <p class="font-arial text-[18px] text-black">
                Книги подобраны по уровням сложности, чтобы вы могли учить английский с комфортом.
              </p>
            </div>
            <div class="text-center">
              <h3 class="font-arial text-[24px] font-bold text-black mb-4">Параллельный перевод</h3>
              <p class="font-arial text-[18px] text-black">
                Читайте текст на английском и сразу видите перевод, чтобы лучше понимать смысл.
              </p>
            </div>
            <div class="text-center">
              <h3 class="font-arial text-[24px] font-bold text-black mb-4">Словарь и обучение</h3>
              <p class="font-arial text-[18px] text-black">
                Добавляйте слова в словарь и учите их с помощью удобных инструментов.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full bg-[#F5F5F5] py-16">
        <div class="container mx-auto px-4 text-center">
          <h2 class="font-arial text-[32px] font-bold leading-[140%] text-black mb-8">
            Начните изучать английский уже сегодня!
          </h2>
          <button @click="$router.push('/books')"
            class="cursor-pointer bg-[#292D32] text-white font-arial text-[20px] font-bold px-8 py-4 rounded-lg hover:bg-[#1A1D21] transition-colors">
            Перейти в каталог
          </button>
        </div>
      </div>

    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>
