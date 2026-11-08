<script setup>
import { inject } from 'vue'

// Получаем курс от родителя
const course = inject('course')
</script>

<template>
  <section v-if="course">
    <h2>Отзывы</h2>
    <ul class="reviews">
      <li v-for="(review, i) in course.reviews" :key="i">
        <strong>{{ review.author }}</strong>
        <span class="rating"> — рейтинг: {{ review.rating }}/5</span>
        <p>{{ review.text }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.reviews { list-style: none; padding: 0; }
.reviews li { border-bottom: 1px solid #eee; padding: 8px 0; }
.rating { color: #f39c12; font-size: 14px; }
</style>