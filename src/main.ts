import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vueKeycloak } from '@josempgon/vue-keycloak'

import App from './App.vue'
import router from './router'
const initApp = async () => {
  const app = createApp(App)

  await vueKeycloak.install(app, {
    config: {
      url: 'http://localhost:8082',
      realm: 'boolkus',
      clientId: 'vue-client',
    },
    initOptions: {
      flow: 'standard',
      checkLoginIframe: false,
      onLoad: 'login-required',
      pkceMethod: 'S256',
    },
  })

  app.use(createPinia())
  app.use(router)
  app.mount('#app')
}

initApp()
