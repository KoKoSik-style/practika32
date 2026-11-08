<script setup>
import { inject } from 'vue'

// Получаем курс от родителя через inject.
// Родитель отдаёт развёрнутое значение (computed -> значение),
// поэтому здесь работаем как с обычным объектом.
const course = inject('course', null)
</script>

<template>
  <section v-if="course">
    <h2>Описание</h2>
    <p>{{ course.description }}</p>
  </section>
</template>