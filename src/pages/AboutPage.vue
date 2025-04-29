<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">
        О проекте Boolkus
      </h1>

      <div class="space-y-6 text-lg text-gray-700">
        <p>
          Добро пожаловать на <span class="font-semibold text-indigo-600">Bulkus</span> —
          ваш надежный помощник в изучении английского языка через увлекательное и адаптивное чтение!
        </p>

        <p>
          Мы в Bulkus верим, что лучший способ выучить язык — это погрузиться в него естественно и с удовольствием.
          Именно поэтому мы создали платформу, где вы можете читать книги на английском, подобранные под ваш уровень
          языка, с параллельным переводом, чтобы помочь вам понять каждое слово.
        </p>

        <p>
          Независимо от того, начинающий вы или продвинутый ученик, наша коллекция книг поможет вам улучшить словарный
          запас, грамматику и навыки понимания текста, наслаждаясь захватывающими историями.
        </p>
      </div>

      <div class="mt-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">
          Почему выбирают Boolkus?
        </h2>
        <ul class="space-y-4 text-gray-700">
          <li class="flex items-start">
            <span class="flex-shrink-0 text-indigo-600 mr-3">✔️</span>
            <span>
              <span class="font-semibold">Адаптивное обучение:</span> Книги подбираются в зависимости от вашего уровня
              английского.
            </span>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 text-indigo-600 mr-3">✔️</span>
            <span>
              <span class="font-semibold">Параллельный перевод:</span> Читайте на английском с мгновенным переводом,
              чтобы понимать каждое предложение.
            </span>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 text-indigo-600 mr-3">✔️</span>
            <span>
              <span class="font-semibold">Широкий выбор:</span> Исследуйте постоянно растущую библиотеку книг разных
              жанров и уровней сложности.
            </span>
          </li>
          <li class="flex items-start">
            <span class="flex-shrink-0 text-indigo-600 mr-3">✔️</span>
            <span>
              <span class="font-semibold">Удобный интерфейс:</span> Наш интуитивно понятный дизайн делает чтение и
              обучение максимально комфортным.
            </span>
          </li>
        </ul>
      </div>

      <div class="mt-12 text-center">
        <p class="text-lg text-gray-700 mb-6">
          Готовы начать путь к свободному владению английским?
        </p>
        <router-link to="/books"
          class="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
          Перейти к библиотеке
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AboutPage",
});
</script>
