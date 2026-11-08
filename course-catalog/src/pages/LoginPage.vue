<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Поле ввода пароля
const password = ref('')
const error = ref('')

// Демонстрационный «токен» с фиктивным сроком жизни (1 час).
// В реальном приложении токен выдаёт сервер.
function saveFakeToken() {
  const token = {
    value: 'demo',
    expiresAt: Date.now() + 60 * 60 * 1000
  }
  localStorage.setItem('authToken', JSON.stringify(token))
}

function login() {
  if (password.value === '1234') {
    saveFakeToken()

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
.page { padding: 24px; max-width: 320px; }
input {
  display: block;
  margin-bottom: 8px;
  padding: 6px;
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 6px;
  font: inherit;
  background: var(--bg);
  color: var(--text-h);
}
.error { color: #c00; }
</style>