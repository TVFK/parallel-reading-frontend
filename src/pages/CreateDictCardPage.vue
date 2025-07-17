<template>
  <NavBar />
  <div class="w-full mt-20">
    <div class="container mx-auto px-4 py-8 max-w-3xl">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-[#2D2D2D]">
          {{ isEditMode ? 'Редактирование карточки' : 'Новая карточка' }}
          <span class="block mt-1 w-12 h-1 bg-[#A9A8FD]"></span>
        </h1>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <form @submit.prevent="handleSubmit">
          <!-- Слово и перевод -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-gray-700 font-medium mb-2" for="word">Слово *</label>
              <input v-model="formData.word" type="text" id="word" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9A8FD] focus:border-transparent"
                :placeholder="isEditMode ? wordPlaceholder : 'Введите слово'">
            </div>

            <div>
              <label class="block text-gray-700 font-medium mb-2" for="translation">Перевод *</label>
              <input v-model="formData.translation" type="text" id="translation" required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9A8FD] focus:border-transparent"
                :placeholder="isEditMode ? translationPlaceholder : 'Введите перевод'">
            </div>
          </div>

          <!-- Контекст -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2" for="context">Контекст</label>
            <textarea v-model="formData.context" id="context" rows="3" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9A8FD] focus:border-transparent"
              :placeholder="isEditMode ? contextPlaceholder : 'Введите пример использования'"></textarea>
          </div>

          <!-- Сложность -->
          <div class="mb-6">
            <label class="block text-gray-700 font-medium mb-2">Сложность *</label>
            <div class="flex">
              <button type="button" v-for="star in 3" :key="star" @click="formData.difficulty = star" :class="{
                'text-yellow-400': star <= formData.difficulty,
                'text-gray-300': star > formData.difficulty
              }" class="p-1 focus:outline-none transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Теги -->
          <div class="mb-8">
            <label class="block text-gray-700 font-medium mb-2" for="tags">Теги</label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="(tag, index) in formData.tags" :key="index"
                class="px-3 py-1 bg-[#F0F0FF] text-[#5E5DF0] text-xs rounded-full flex items-center">
                {{ tag }}
                <button type="button" @click="removeTag(index)" class="ml-1 text-[#5E5DF0] hover:text-[#A9A8FD]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>
            <div class="relative">
              <input v-model="tagInput" @keydown.enter.prevent="addTag" type="text" id="tags"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9A8FD] focus:border-transparent"
                placeholder="Введите тег и нажмите Enter">
              <span class="absolute right-3 top-2.5 text-gray-400 text-sm">Enter</span>
            </div>
          </div>

          <!-- Кнопки -->
          <div class="flex justify-end gap-4 pt-4 border-t border-gray-100">
            <button type="button" @click="cancel"
              class="cursor-pointer px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
              Отмена
            </button>
            <button type="submit"
              class="cursor-pointer px-6 py-2 bg-[#A9A8FD] text-white rounded-lg hover:bg-[#9493F0] transition-colors shadow-md flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ isEditMode ? 'Обновить карточку' : 'Сохранить карточку' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useDictionaryStore } from '@/stores/DictionaryStore';
import type { NewDictionaryCard } from '@/types/NewDictionaryCard';
import type { UpdateDictionaryCard } from '@/types/UpdateDictionaryCard';
import type { DictionaryCard } from '@/types/DictionaryCard';

const route = useRoute();
const router = useRouter();
const dictionaryStore = useDictionaryStore();

const isEditMode = computed(() => !!route.params.id);

const originalCard = ref<DictionaryCard | null>(null);
const wordPlaceholder = ref('');
const translationPlaceholder = ref('');
const contextPlaceholder = ref('');

const formData = ref<NewDictionaryCard | UpdateDictionaryCard>({
  word: '',
  translation: '',
  context: '',
  difficulty: 1,
  tags: [],
});

const tagInput = ref('');

const addTag = () => {
  if (tagInput.value.trim() && !formData.value.tags?.includes(tagInput.value.trim())) {
    formData.value.tags?.push(tagInput.value.trim());
    tagInput.value = '';
  }
};

const removeTag = (index: number) => {
  formData.value.tags?.splice(index, 1);
};


onMounted(async () => {
  if (isEditMode.value) {
    const cardId = route.params.id as string;
    originalCard.value = await dictionaryStore.getCardById(cardId);

    if (originalCard.value) {
      formData.value = {
        word: originalCard.value.word,
        translation: originalCard.value.translation,
        context: originalCard.value.context,
        difficulty: originalCard.value.difficulty,
        tags: [...originalCard.value.tags]
      };

      // Сохраняем оригинальные значения для плейсхолдеров
      wordPlaceholder.value = originalCard.value.word;
      translationPlaceholder.value = originalCard.value.translation;
      contextPlaceholder.value = originalCard.value.context;
    }
  }
});


const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await dictionaryStore.updateDictionaryCard(
        route.params.id as string,
        formData.value as UpdateDictionaryCard
      );
    } else {
      await dictionaryStore.createDictionaryCard(
        formData.value as NewDictionaryCard
      );
    }
    router.push('/dictionary');
  } catch (error) {
    console.error('Ошибка:', error);
  }
};
const cancel = () => {
  router.push('/dictionary');
};
</script>

<style scoped>
input,
textarea {
  transition: all 0.3s ease;
}

input:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(169, 168, 253, 0.2);
}
</style>
