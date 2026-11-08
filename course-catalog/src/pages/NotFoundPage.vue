<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="page">
    <h1>404</h1>
    <p>Страница не найдена</p>
    <button @click="goHome">На главную</button>
  </div>
</template>

<style scoped>
.page {
  padding: 24px;
  text-align: center;
}
</style>