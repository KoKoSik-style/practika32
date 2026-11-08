<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Выход: удаляем токен и уходим на /login
function logout() {
  localStorage.removeItem('authToken')
  router.push('/login')
}
</script>

<template>
  <div class="page">
    <h1>Личный кабинет</h1>
    <p>Личный кабинет. Вы авторизованы.</p>
    <button @click="logout">Выйти</button>
  </div>
</template>

<style scoped>
.page { padding: 24px; }
</style>