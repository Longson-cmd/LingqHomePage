<template>
  <NuxtLink class="w-[306px] block items-center justify-center rounded-2xl overflow-hidden  
  border hover:border-gray-400 hover:shadow-lg transition-all duration-200 group"
  to="/en/learn/">
    <!-- Top Image / Cover section -->
    <div class="h-40 relative bg-cover bg-center"
    :style="{backgroundImage: 'url(/images/Girl.jpeg)'}"
    >
      <!-- Dark-to-transparent gradient for text readability -->
      <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent"></div>
      <!-- Provider badge -->
      <div class="absolute left-2 top-2 flex items-center gap-2">
        <img src="/images/lingLogo.png" alt="lingQ Logo" class="h-10">
        <span class="text-white font-semibold hidden group-hover:inline">LingQ</span>
      </div>
      <!-- Action buttons -->
      <div class="absolute right-2 top-2 hidden group-hover:flex gap-2 items-center">
        <button class="h-9 w-9 rounded-full bg-white/90 backdrop-blur hover:bg-white">
          <font-awesome-icon icon="fa-plus" class="text-gray-900 text-base"/>
        </button>
        <button class="h-9 w-9 rounded-full bg-white/90 backdrop-blur hover:bg-white">
          <font-awesome-icon icon="fa-chevron-down" class="text-gray-900 text-base"/>
        </button>
      </div>
      <!-- Big number badge -->
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="h-16 w-16 bg-indigo-900/70 rounded-full flex items-center justify-center">
          <span class="text-3xl text-yellow-400 font-semibold">3</span>
        </div>
      </div>
      <!-- Word indicators -->
      <div class="absolute left-2 bottom-2 flex flex-col space-y-[2px] font-medium">
        <div class="flex items-center text-white gap-2 text-xs">
          <span class="inline-block w-4 h-4 bg-blue-600 rounded"></span>
          <span>46 New Words</span>
        </div>
        <div class="flex items-center text-white gap-2 text-xs">
          <span class="inline-block w-4 h-4 bg-yellow-400 rounded"></span>
          <span>24 LingQs</span>
        </div>
        <div class="flex items-center text-white gap-2 text-xs">
          <span class="inline-block w-4 h-4 bg-white rounded"></span>
          <span>13 Known Words</span>
        </div>
      </div>

      <div class="absolute right-2 bottom-2 flex items-center">
        <div class="flex items-center justiy-center px-3 py-[2px] gap-1 border border-white rounded-full bg-white/20 backdrop-blur
        text-white text-sm
        ">     
          <font-awesome-icon icon="fa-heart"/>
          32
        </div>
      </div>

    </div>

    <!-- Card Body -->
    <div class="p-4 w-full flex flex-col  text-xs space-y-2">
      <!-- Title + menu -->
      <div class="flex w-full items-start justify-between">
        <h2 class="font-semibold text-sm leading-snug">3-Cathrine adopts a cat</h2>
        <button class="text-gray-500 hover:text-gray-700 hover:scale-125">
          <font-awesome-icon icon="fa-ellipsis-v"/>
        </button>
      </div>
      <!-- Difficulty & level -->
      <div class="flex items-center gap-1 text-gray-700">
        <span class="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
        <span>52% New Words</span>
        <span class="hidden group-hover:flex">• Beginner 2</span>
      </div>
      <!-- Collection + duration -->
      <div class="flex items-center text-gray-500 justify-between">
        <span class="truncate">LingQ Mini Stories – Canada (Québécois)</span>
        <div class="flex items-center gap-1 min-w-max">
          <font-awesome-icon icon="fa-headphones"/>
          03:53
        </div>
      </div>

    </div>
  </NuxtLink>
</template>



<!-- absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent -->

<!-- LingQ Mini Stories – Canada (Québécois) -->

<!-- <font-awesome-icon icon="fa-ellipsis-v" />
<font-awesome-icon icon="fa-headphones" /> -->


<!-- <script setup>
import LessonCard from "~/components/HomePage/LessonCard.vue";

const example = {
  lessonNumber: 3,
  image: '/images/Girl.jpeg',
  newWords: 46,
  lingqs: 24,
  knowWords: 13, // 👈 make sure this matches the prop name
  favorites: 32,
  title: '3 – Catherine adopts a cat',
  difficulty: '52',
  level: 'Beginner 2',
  collection: 'LingQ Mini Stories – Canada (Québécois)',
  duration: '03:53'
}

const lessons = []

for (let i = 1; i <= 10; i++) {
  lessons.push({
    lessonNumber: example.lessonNumber + i,
    image: example.image,
    newWords: example.newWords + i,
    lingqs: example.lingqs,
    knowWords: example.knowWords,
    favorites: example.favorites,
    title: `${example.lessonNumber + i} – Catherine adopts a cat`,
    difficulty: example.difficulty,
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
</template>  -->
