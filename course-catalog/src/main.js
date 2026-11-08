import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // подключаем роутер

// Создаём приложение, подключаем роутер и монтируем в #app
createApp(App).use(router).mount('#app')