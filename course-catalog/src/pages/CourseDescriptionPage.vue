<script setup>
import { inject } from 'vue'

// Получаем курс от родителя через inject
const course = inject('course')
</script>

<template>
  <section v-if="course">
    <h2>Описание</h2>
    <p>{{ course.description }}</p>
  </section>
</template>