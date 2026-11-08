<script setup>
import { computed, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/courses'

const route = useRoute()
const router = useRouter()

// Получаем курс по ID из параметров маршрута
const course = computed(() =>
  courses.find(c => c.id === Number(route.params.id))
)

// Прокидываем курс в дочерние вкладки через provide
provide('course', course)
</script>

<template>
  <div class="page">
    <!-- Если курс не найден — показываем сообщение -->
    <div v-if="!course">
      <h1>Курс не найден</h1>
      <button @click="router.push('/courses')">Назад к списку</button>
    </div>

    <!-- Если найден — заголовок и вкладки -->
    <div v-else>
      <h1>{{ course.title }}</h1>

      <!-- Навигация по вкладкам (относительные пути) -->
      <nav class="tabs">
        <RouterLink to="description">Описание</RouterLink>
        <RouterLink to="program">Программа</RouterLink>
        <RouterLink to="reviews">Отзывы</RouterLink>
      </nav>

      <!-- Контент активной вкладки -->
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px; font-family: sans-serif; }
.tabs { display: flex; gap: 12px; margin: 16px 0; }
.tabs a { text-decoration: none; color: #333; padding: 4px 8px; border-radius: 4px; }
.tabs a.router-link-active { background: #4caf50; color: #fff; }
</style>