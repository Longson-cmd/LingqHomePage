<script setup>
import LessonCard from "~/components/HomePage/LessonCard.vue";

const example = {
  lessonNumber: 0,
  image: '/images/Girl.jpeg',
  newWords: 46,
  lingqs: 24,
  knowWords: 13, // 👈 make sure this matches the prop name
  favorites: 32,
  title: 'Catherine adopts a cat',
  difficulty: '52',
  level: 'Beginner 2',
  collection: 'LingQ Mini Stories – Canada (Québécois)',
  duration: '03:53'
}

const lessons = []

for (let i =1; i<=10; i++) {
    lessons.push({
    lessonNumber: example.lessonNumber + i,
    image: example.image,
    newWords: example.newWords + i,
    lingqs: example.lingqs-i,
    knowWords: example.knowWords-i,
    favorites: example.favorites -i,
    title: `${example.lessonNumber + i} – Catherine adopts a cat`,
    difficulty: example.difficulty-3*i,
    level: example.level,
    collection: example.collection,
    duration: example.duration
  })
}


</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 mdxl:grid-cols-3 md2xl1:grid-cols-4 md2xl2:grid-cols-5 gap-2 p-16">
    <LessonCard
    v-for="(lesson, index) in lessons"
    :key="index"
    v-bind="lesson"
    
    />
  </div>
</template>