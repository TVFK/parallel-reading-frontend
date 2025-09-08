<template>
  <NavBar />
  <div class="w-full mt-20">
    <div class="container mx-auto px-4 mb-8 min-h-screen">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-[#2D2D2D]">
          Режим обучения
          <span class="block mt-1 w-12 h-1 bg-[#A9A8FD]"></span>
        </h1>
        <button @click="endSession"
          class="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Закончить
        </button>
      </div>

      <div class="mb-8">
        <div class="flex justify-between text-sm text-gray-500 mb-1">
          <span>Прогресс: {{ progressDisplay.current }} / {{ progressDisplay.total }}</span>
          <span>{{ progressDisplay.percentage }}%</span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div class="h-full bg-[#5E5DF0] transition-all duration-500 ease-out"
            :style="{ width: `${progressDisplay.percentage}%` }"></div>
        </div>
      </div>

      <div v-if="isLoading" class="flex justify-center items-center h-96">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5E5DF0]"></div>
      </div>

      <div v-else-if="sessionCompleted" class="flex flex-col items-center justify-center h-96 text-center">
        <div class="bg-green-100 rounded-full p-4 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Сессия завершена!</h2>
        <p class="text-gray-600 mb-6">Вы повторили все слова на сегодня.</p>
        <button @click="endSession"
          class="cursor-pointer px-6 py-3 bg-[#5E5DF0] text-white rounded-lg hover:bg-[#4A49D0] transition-colors">
          Вернуться в словарь
        </button>
      </div>

      <div v-else class="flex flex-col items-center">
        <transition name="card-flip" mode="out-in">
          <div v-if="!showAnswer" key="front" @click="showAnswer = true"
            class="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100 cursor-pointer transform transition-transform hover:scale-[1.02]">
            <div class="flex justify-between items-start mb-6">
              <div>
                <span class="text-sm text-gray-500">Слово</span>
                <h2 class="text-4xl font-bold text-gray-800 mt-1">{{ currentCard.word }}</h2>
              </div>
              <button @click.stop="playAudio" class="text-[#5E5DF0] hover:text-[#4A49D0]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </button>
            </div>

            <div class="mt-12 text-center">
              <p class="text-gray-600 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Нажмите, чтобы увидеть перевод
              </p>
            </div>
          </div>

          <div v-else key="back" class="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div class="flex justify-between items-start mb-6">
              <div>
                <span class="text-sm text-gray-500">Слово</span>
                <h2 class="text-4xl font-bold text-gray-800 mt-1">{{ currentCard.word }}</h2>
              </div>
              <div class="flex gap-2">
                <button @click="playAudio" class="text-[#5E5DF0] hover:text-[#4A49D0]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="mt-6">
              <span class="text-sm text-gray-500">Перевод</span>
              <p class="text-2xl text-[#5E5DF0] font-medium mt-1">{{ currentCard.translation }}</p>
            </div>

            <div class="mt-6" v-if="currentCard.context">
              <span class="text-sm text-gray-500">Контекст</span>
              <p class="text-gray-700 italic mt-1">"{{ currentCard.context }}"</p>
            </div>

            <div class="mt-6 flex flex-wrap gap-2" v-if="currentCard.tags && currentCard.tags.length">
              <span v-for="(tag, tagIndex) in currentCard.tags" :key="tagIndex"
                class="px-3 py-1 bg-[#F0F0FF] text-[#5E5DF0] text-xs rounded-full">
                {{ tag }}
              </span>
            </div>

            <div class="mt-10 grid grid-cols-3 gap-4">
              <button v-for="(btn, index) in difficultyButtons" :key="index" @click="submitReview(btn.difficulty)"
                class="cursor-pointer py-4 rounded-xl flex flex-col items-center justify-center transition-all"
                :class="btn.bgColor">
                <span class="text-xl font-semibold">{{ btn.label }}</span>
                <span class="text-sm mt-1">{{ btn.description }}</span>
              </button>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useDictionaryStore } from '@/stores/DictionaryStore';
import type { DictionaryCard } from '@/types/DictionaryCard';
import { useKeycloak } from '@josempgon/vue-keycloak';

const keycloakobj = useKeycloak();
const { keycloak } = useKeycloak();
const dictionaryStore = useDictionaryStore();
const router = useRouter();

const isLoading = ref(true);
const sessionCompleted = ref(false);
const cards = ref<DictionaryCard[]>([]);
const currentCardIndex = ref(0);
const showAnswer = ref(false);

const difficultyButtons = [
  {
    difficulty: 1,
    label: 'Сложно',
    description: 'Не помню',
    bgColor: 'bg-red-100 hover:bg-red-200 text-red-700'
  },
  {
    difficulty: 2,
    label: 'Нормально',
    description: 'Почти вспомнил',
    bgColor: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
  },
  {
    difficulty: 3,
    label: 'Легко',
    description: 'Отлично помню',
    bgColor: 'bg-green-100 hover:bg-green-200 text-green-700'
  }
];

const currentCard = computed(() => {
  return cards.value[currentCardIndex.value] || {};
});

const progressDisplay = computed(() => {
  if (sessionCompleted.value) {
    return {
      current: cards.value.length,
      total: cards.value.length,
      percentage: 100
    };
  }

  if (cards.value.length === 0) {
    return {
      current: 0,
      total: 0,
      percentage: 100
    };
  }

  const percentage = Math.round((currentCardIndex.value / cards.value.length) * 100);

  return {
    current: currentCardIndex.value,
    total: cards.value.length,
    percentage: percentage
  };
});


const initLearning = async () => {
  try {
    isLoading.value = true;
    await dictionaryStore.fetchReviewCards();
    cards.value = [...dictionaryStore.reviewCards];

    if (cards.value.length === 0) {
      sessionCompleted.value = true;
    }
  } catch (error) {
    console.error('Ошибка загрузки карточек:', error);
  } finally {
    isLoading.value = false;
  }
};

const submitReview = async (difficulty: number) => {
  if (!currentCard.value.id) return;

  try {
    await dictionaryStore.reviewCard({
      cardId: currentCard.value.id,
      difficulty
    });

    if (currentCardIndex.value < cards.value.length - 1) {
      currentCardIndex.value++;
      showAnswer.value = false;
    } else {
      sessionCompleted.value = true;
    }
  } catch (error) {
    console.error('Ошибка отправки оценки:', error);
  }
};

const playAudio = () => {
  if ('speechSynthesis' in window && currentCard.value.word) {
    const utterance = new SpeechSynthesisUtterance(currentCard.value.word);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  }
};

const endSession = () => {
  router.push('/dictionary');
};

onMounted(() => {
  if (!keycloakobj.isAuthenticated) {
    keycloak.value?.login();
  }
  initLearning();
});
</script>

<style scoped>
.card-flip-enter-active,
.card-flip-leave-active {
  transition: all 0.6s;
}

.card-flip-enter-from {
  opacity: 0;
  transform: rotateY(90deg);
}

.card-flip-leave-to {
  opacity: 0;
  transform: rotateY(-90deg);
}
</style>
