<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courses } from '../data/courses'

const route = useRoute()
const router = useRouter()

// Флаг загрузки (спиннер)
const loading = ref(true)

// При монтировании имитируем задержку 1000 мс
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
})

// Текущая категория из query-параметра (по умолчанию 'all')
const currentCategory = computed(() => route.query.category || 'all')

// Отфильтрованный список курсов
const filteredCourses = computed(() => {
  const cat = currentCategory.value
  if (cat === 'all') return courses
  return courses.filter(c => c.category === cat)
})

// Переключение фильтра — обновляем URL через router.push
function setCategory(cat) {
  router.push({ path: '/courses', query: { category: cat } })
}
</script>

<template>
  <div class="page">
    <h1>Список курсов</h1>

    <!-- Спиннер, пока идёт "загрузка" -->
    <div v-if="loading" class="spinner">
      Загрузка...
    </div>

    <!-- Контент после загрузки -->
    <div v-else>
      <!-- Кнопки фильтра -->
      <div class="filters">
        <button
          :class="{ active: currentCategory === 'all' }"
          @click="setCategory('all')"
        >Все</button>
        <button
          :class="{ active: currentCategory === 'frontend' }"
          @click="setCategory('frontend')"
        >Frontend</button>
        <button
          :class="{ active: currentCategory === 'backend' }"
          @click="setCategory('backend')"
        >Backend</button>
      </div>

      <!-- Список курсов -->
      <div class="cards">
        <div v-for="course in filteredCourses" :key="course.id" class="card">
          <h3>{{ course.title }}</h3>
          <p class="category">Категория: {{ course.category }}</p>
          <!-- Переход на страницу курса -->
          <RouterLink :to="`/courses/${course.id}`">Подробнее</RouterLink>
        </div>

        <p v-if="filteredCourses.length === 0">В этой категории пока нет курсов.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page { padding: 24px; font-family: sans-serif; }
.spinner { padding: 24px; font-style: italic; color: #666; }
.filters { display: flex; gap: 8px; margin-bottom: 16px; }
.filters button { padding: 6px 12px; cursor: pointer; }
.filters button.active { background: #4caf50; color: #fff; border: none; }
.cards { display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
.card { border: 1px solid #ddd; border-radius: 8px; padding: 12px; }
.category { color: #777; font-size: 14px; }
</style>