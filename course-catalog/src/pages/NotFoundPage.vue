<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="page">
    <h1>404</h1>
    <p>Страница не найдена</p>
    <button @click="router.push('/')">На главную</button>
  </div>
</template>

<style scoped>
.page { padding: 24px; font-family: sans-serif; text-align: center; }
button { padding: 6px 12px; cursor: pointer; }
</style>