<script setup>
import { inject } from 'vue'

// Получаем курс от родителя
const course = inject('course', null)
</script>

<template>
  <section v-if="course">
    <h2>Программа</h2>
    <!-- Нумерованный список тем -->
    <ol>
      <li v-for="(topic, i) in course.program" :key="i">{{ topic }}</li>
    </ol>
  </section>
</template>