<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />

    <main class="flex-1">
      <div class="container w-2/5 p-6 mx-auto mt-32 rounded-lg shadow-sm bg-white shadow-gray-600">
        <h1 class="mb-6 text-3xl text-center text-black">Регистрация</h1>
        <form @submit.prevent="register">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
            <DefaultInput v-model="registrationCredentials.email" type="email" id="email" name="email" required
              class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Пароль:</label>
            <DefaultInput v-model="registrationCredentials.password" type="password" id="password" name="password"
              required
              class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
          </div>

          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Подтвердите пароль:</label>
            <DefaultInput v-model="registrationCredentials.confirmPassword" type="password" id="confirmPassword"
              name="confirmPassword" required
              class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500" />
          </div>

          <div class="mb-4">
            <label class="flex items-center">
              <input v-model="registrationCredentials.termsAccepted" type="checkbox" id="terms" class="mr-2" />
              Согласен с условиями
            </label>
          </div>

          <div class="flex space-x-4">
            <DefaultButton type="submit" id="registerMyButton" class="px-6 py-2 shadow-sm hover:bg-blue-600">
              Регистрация
            </DefaultButton>
          </div>
        </form>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue';
import NavBar from '../components/NavBar.vue';
import axios from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import DefaultInput from '@/components/UI/DefaultInput.vue';
import DefaultButton from '@/components/UI/DefaultButton.vue';

const router = useRouter();
const termsAccepted = ref(false);

const registrationCredentials = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
});


async function register() {
  // try {
  //   const response = await axios.post("http://localhost:8080/api/register", registrationCredentials, {
  //     headers: { "Content-Type": "application/json" },
  //   });

  //   if (response.status === 201) {
  //     console.log('Регистрация прошла успешно!', response.data);
  //     router.push('/login');
  //   } else {
  //     alert('Что-то пошло не так');
  //     console.error("Что-то пошло не так", response);
  //   }
  // } catch (error) {
  //   console.error(`Ошибка HTTP: ${(error as any).response?.status || (error as Error).message}`);
  // }
}

</script>
