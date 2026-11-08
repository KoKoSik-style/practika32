<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Поле ввода пароля
const password = ref('')
const error = ref('')

function login() {
  if (password.value === '1234') {
    // Записываем токен в localStorage
    localStorage.setItem('authToken', 'demo')

    // Если есть query.redirect — возвращаем туда, откуда пришли
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } else {
    error.value = 'Неверный пароль. Подсказка: 1234'
  }
}
</script>

<template>
  <div class="page">
    <h1>Вход</h1>
    <input
      v-model="password"
      type="password"
      placeholder="Введите пароль"
      @keyup.enter="login"
    />
    <button @click="login">Войти</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.page { padding: 24px; font-family: sans-serif; max-width: 320px; }
input { display: block; margin-bottom: 8px; padding: 6px; width: 100%; }
button { padding: 6px 12px; cursor: pointer; }
.error { color: #c00; }
</style>