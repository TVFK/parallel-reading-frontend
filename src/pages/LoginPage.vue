<template>
  <div class="flex flex-col min-h-screen">
    <NavBar />
    <div class="flex items-center justify-center flex-grow">
      <div class="max-w-md p-6 bg-[#F5F5F5] rounded-lg shadow-sm shadow-gray-600">
        <h1 class="mx-auto text-center">Вход</h1>
        <form @submit.prevent>
          <DefaultInput v-model="loginCredentials.login" placeholder="email" type="email" class="w-full p-2 mt-6 ">
          </DefaultInput>
          <DefaultInput v-model="loginCredentials.password" placeholder="Пароль" type="password"
            class="w-full p-2 mt-6 ">
          </DefaultInput>
          <DefaultButton @click="login" class="w-full p-2 mt-6">Вход</DefaultButton>
        </form>
        <div class="mt-2">
          Нет аккаунта? <RouterLink class="text-blue-700" to="/registration">Зарегистрироваться</RouterLink>
        </div>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
import axios from 'axios';
import { reactive } from 'vue';
import router from '@/router';
import DefaultButton from '@/components/UI/DefaultButton.vue';
import DefaultInput from '@/components/UI/DefaultInput.vue';
import AppFooter from '@/components/AppFooter.vue';

const loginCredentials = reactive({
  login: '',
  password: '',
});
const login = async () => {

};

</script>
