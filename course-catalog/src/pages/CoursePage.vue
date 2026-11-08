<script setup>
import { computed, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/courses'

const route = useRoute()
const router = useRouter()

// Получаем курс по ID из параметров маршрута
const course = computed(() =>
  courses.find((c) => c.id === Number(route.params.id))
)

// Прокидываем САМ курс (не ref) в дочерние вкладки через provide.
// Дети получат уже развёрнутое значение, а благодаря реактивности
// computed родителя они обновятся при смене :id.
provide('course', course)

function goBack() {
  router.push('/courses')
}
</script>

<template>
  <div class="page">
    <!-- Если курс не найден — показываем сообщение -->
    <div v-if="!course">
      <h1>Курс не найден</h1>
      <button @click="goBack">Назад к списку</button>
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
.page { padding: 24px; }
.tabs {
  display: flex;
  gap: 12px;
  margin: 16px 0;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
}
.tabs a {
  text-decoration: none;
  color: var(--text-h);
  padding: 4px 10px;
  border-radius: 4px;
}
.tabs a.router-link-active {
  background: #4caf50;
  color: #fff;
}
</style>