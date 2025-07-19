import BookReview from '@/pages/BookReview.vue'
import LoginPage from '@/pages/LoginPage.vue'
import MainPage from '@/pages/MainPage.vue'
import ReadPage from '@/pages/ReadPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import CatalogPage from '@/pages/CatalogPage.vue'
import AboutPage from '@/pages/AboutPage.vue'
import RegistrationPage from '@/pages/RegistrationPage.vue'
import SearchPage from '@/pages/SearchPage.vue'
import E404 from '@/components/ErrorPage404.vue'
import DictionaryPage from '@/pages/DictionaryPage.vue'
import CreateDictCardPage from '@/pages/CreateDictCardPage.vue'
import LearningPage from '@/pages/LearningPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
    },
    {
      path: '/books',
      name: 'books',
      component: CatalogPage,
    },
    {
      path: '/books/review/:bookTitle',
      name: 'review',
      component: BookReview,
    },
    {
      path: '/books/:bookTitle',
      name: 'read',
      component: ReadPage,
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: DictionaryPage,
    },
    {
      path: '/dictionary/create',
      name: 'create-card',
      component: CreateDictCardPage,
    },
    {
      path: '/dictionary/edit/:id',
      name: 'edit-cartd',
      component: CreateDictCardPage,
    },
    {
      path: '/learn',
      name: 'learning',
      component: LearningPage,
    },
    {
      path: '/registration',
      name: 'registration',
      component: RegistrationPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/search',
      name: 'search',
      component: SearchPage,
    },
    {
      path: '/:any(.*)',
      component: E404,
    },
  ],
})

export default router
