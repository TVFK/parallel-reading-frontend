<template>
  <NavBar />
  <div class="w-full mt-20">
    <div class="container mx-auto px-4 mb-8">
      <DictionaryHeader @start-learning="startLearning" />

      <DictionaryFilters v-model:sortOption="sortOption" :active-filters="activeFilters" @toggle-filter="toggleFilter"
        class="mt-8" />

      <div v-if="dictionaryStore.isLoading" class="flex justify-center mt-20">
        Идёт загрузка
      </div>

      <div v-else>
        <div v-if="words.length > 0" class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DictCard v-for="word in words" :key="word.id" :word="word" @edit="editWord(word)"
            @delete="deleteWord(word)" />
        </div>
        <div v-else class="flex h-screen items-center justify-center">
          <h1 class="text-3xl font-bold text-[#2D2D2D]">
            У вас пока не добавлено ни одной карточки!
          </h1>
        </div>

        <div v-if="dictionaryStore.totalPages > 1" class="mt-12 flex justify-center">
          <DictionaryPagination :current-page="currentPage" :total-pages="dictionaryStore.totalPages"
            @change-page="changePage" @prev-page="prevPage" @next-page="nextPage" />
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import NavBar from '@/components/NavBar.vue';
import DictionaryHeader from '@/components/dictoinary-page/DictionaryHeader.vue';
import DictionaryFilters from '@/components/dictoinary-page/DictionaryFilters.vue';
import DictCard from '@/components/dictoinary-page/DictCard.vue';
import DictionaryPagination from '@/components/dictoinary-page/DictionaryPagination.vue';
import type { DictionaryCard } from '@/types/DictionaryCard';
import { onMounted, ref } from 'vue';
import { useDictionaryStore } from '@/stores/DictionaryStore';
import { useRouter } from 'vue-router';
import { watch } from 'vue';
import { useKeycloak } from '@josempgon/vue-keycloak';

const { keycloak } = useKeycloak();
const dictionaryStore = useDictionaryStore();
const router = useRouter();

const sortOption = ref('date');
const currentPage = ref(0);
const pageSize = 9;
const activeFilters = ref<string[]>([]);
const words = ref<DictionaryCard[]>([]);

const startLearning = () => {
  router.push('/learn')
};

const toggleFilter = (filter: string) => {
  if (activeFilters.value.includes(filter)) {
    activeFilters.value = activeFilters.value.filter(f => f !== filter);
  } else {
    activeFilters.value.push(filter);
  }
};

const editWord = (word: DictionaryCard) => {
  router.push(`/dictionary/edit/${word.id}`)
};

const loadData = async () => {
  await dictionaryStore.fetchDictionaryCards(
    currentPage.value,
    pageSize,
    sortOption.value
  );
  words.value = dictionaryStore.dictionaryCards;
};

onMounted(async () => {
  if (!keycloak.value?.authenticated) {
    keycloak.value?.login();
  }
})

onMounted(loadData);

watch(sortOption, () => {
  currentPage.value = 0;
  loadData();
});

const changePage = (page: number) => {
  currentPage.value = page - 1;
  loadData();
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    loadData();
  }
};

const nextPage = () => {
  if (currentPage.value < dictionaryStore.totalPages - 1) {
    currentPage.value++;
    loadData();
  }
};

const deleteWord = async (word: DictionaryCard) => {
  await dictionaryStore.deleteDictionaryCard(word.id);

  if (words.value.length === 1 && currentPage.value > 0) {
    currentPage.value--;
  }

  loadData();
};

</script>

<style scoped>
.card-enter-active,
.card-leave-active {
  transition: all 0.4s ease;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
