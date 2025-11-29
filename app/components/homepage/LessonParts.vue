<template>
   <div class="bg-gray-50">
        <div class="p-3 md:px-[56px] text-lg flex flex-col sm:flex-row sm:items-center justify-start gap-3 ">
            <span class="font-medium">Continue Studying <font-awesome icon="play" class="font-light"/></span>
            
            <div class="flex gap-3">
              <span>Lesson</span>
              <span>Courses</span>
              <span>Imported Lesson</span>
            </div>
    
        </div>
        <div class="flex flex-row items-center w-full mb-2">
          <button :disabled="trendingStartIndex===0" @click="getNewLessons('left')" class=" w-[12px] md:w-[56px]  flex items-center justify-center flex-shrink-0 text-4xl hover:text-5xl "><font-awesome icon="chevron-left" v-show="trendingStartIndex!==0 && breakpoints.greater('md').value"/></button> 
          <div class="flex flex-row w-max overflow-x-auto md:max-w-full md:grid md:flex-grow gap-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <LessonCard v-for="i in numberLessonShow" :key="i" :lesson-number="(i + trendingStartIndex)"/>
          </div>
          <button :disabled="trendingStartIndex===10" @click="getNewLessons('right')" class="w-[12px] md:w-[56px] flex items-center justify-center flex-shrink-0 text-4xl hover:text-5xl "><font-awesome icon="chevron-right" v-show="trendingStartIndex!==10 && breakpoints.greater('md').value"/></button> 
        </div>
   </div>

    <div v-for="content in contents" class="my-2 bg-gray-50">
      <div class="p-3 md:px-[56px] text-lg flex flex-row items-center justify-start gap-3">
          <span class="font-medium">{{content}}</span>
          <font-awesome icon="play" class="font-light"/>
          
          <span>Lesson</span>
          <span>Courses</span>
  
      </div>
      <div class="flex flex-row items-center w-full">
        <button :disabled="podcastsStartIndex===0" @click="getNewLessons2('left')" class="w-[12px] md:w-[56px] flex items-center justify-center flex-shrink-0 text-4xl hover:text-5xl "><font-awesome icon="chevron-left" v-show="podcastsStartIndex!==0 && breakpoints.greater('md').value"/></button> 
        <div class="flex flex-row w-max overflow-x-auto md:max-w-full md:grid md:flex-grow gap-2   md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <LessonCard v-for="i in numberLessonShow" :key="i" :lesson-number="(i + podcastsStartIndex)"/>
        </div>
        <button :disabled="podcastsStartIndex===10" @click="getNewLessons2('right')" class="w-[12px] md:w-[56px] flex items-center justify-center flex-shrink-0 text-4xl hover:text-5xl "><font-awesome icon="chevron-right" v-show="podcastsStartIndex!==10 && breakpoints.greater('md').value"/></button> 
      </div>
    </div>
</template>


<script setup>

import LessonCard from './component/LessonCard.vue'
import {ref, computed} from 'vue'
import { useBreakpoints} from '@vueuse/core'

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
})


const trendingStartIndex = ref(0)
const podcastsStartIndex = ref(0)
const newsStartIndex = ref(1)
const foodStartIndex = ref(1)
const travalStartIndex = ref(1)

const numberLessonShow = computed(() => {
  if(breakpoints.smaller('md').value) {return 10}
  else if (breakpoints.between('md' , 'lg').value ) {return 3}
  else if (breakpoints.between('lg' , 'xl').value ) {return 4}
  else {return 5}
})


const getNewLessons = (direction) => {
  if (direction === 'left') {
    trendingStartIndex.value = trendingStartIndex.value- 4
  }

  else {
      trendingStartIndex.value = trendingStartIndex.value + 4
  }

  if (trendingStartIndex .value < 0) trendingStartIndex.value = 0
  if (trendingStartIndex .value >  10) trendingStartIndex.value = 10

}
const getNewLessons2 = (direction) => {
  if (direction === 'left') {
    podcastsStartIndex.value = podcastsStartIndex.value- 4
  }

  else {
      podcastsStartIndex.value = podcastsStartIndex.value + 4
  }

  if (podcastsStartIndex .value < 0) podcastsStartIndex.value = 0
  if (podcastsStartIndex .value >  10) podcastsStartIndex.value = 10

}


const contents = ["Postcard", 'News',  'Health', 'Sports',  'Kids']


</script>
