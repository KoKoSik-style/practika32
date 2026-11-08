<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="page">
    <h1>Каталог курсов</h1>
    <p>Добро пожаловать! Выберите курс, чтобы узнать подробности.</p>
    <!-- Переход к списку курсов -->
    <button @click="router.push('/courses')">Смотреть курсы</button>
  </div>
</template>

<style scoped>
.page { padding: 24px; font-family: sans-serif; }
button { padding: 8px 16px; cursor: pointer; }
</style>