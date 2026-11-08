<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToCourses() {
  router.push('/courses')
}
</script>

<template>
  <div class="page">
    <h1>Каталог курсов</h1>
    <p>Добро пожаловать! Выберите курс, чтобы узнать подробности.</p>
    <button @click="goToCourses">Смотреть курсы</button>
  </div>
</template>

<style scoped>
.page { padding: 24px; }
</style>