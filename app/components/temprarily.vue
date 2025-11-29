<template>
    <div class="p-3 md:px-[56px] text-lg flex flex-col sm:flex-row sm:items-center justify-start gap-3 mt-2">
        <span class="font-medium">Continue Studying <font-awesome icon="play" class="font-light"/></span>
        
        <div class="flex gap-3">
          <span>Lesson</span>
          <span>Courses</span>
          <span>Imported Lesson</span>
        </div>

    </div>
    <div class="flex flex-row items-center w-full mb-2">
      <button :disabled="trendingStartIndex===0" @click="getNewLessons('left')" class="w-[56px] flex items-center justify-center flex-shrink-0 text-4xl hover:text-5xl "><font-awesome icon="chevron-left" v-show="trendingStartIndex!==0 && breakpoints.greater('sm').value"/></button> 
      <div class="flex flex-row w-max overflow-x-auto sm:max-w-full sm:grid sm:flex-grow gap-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <LessonCard v-for="i in numberLessonShow" :key="i" :lesson-number="(i + trendingStartIndex)"/>
      </div>
      <button :disabled="trendingStartIndex===10" @click="getNewLessons('right')" class="w-[56px] flex items-center justify-center flex-shrink-0 text-4xl hover:text-5xl "><font-awesome icon="chevron-right" v-show="trendingStartIndex!==10 && breakpoints.greater('sm').value"/></button> 
    </div>

    <div v-for="content in contents" class="my-2">
      <div class="p-3 md:px-[56px] text-lg flex flex-row items-center justify-start gap-3">
          <span class="font-medium">{{content}}</span>
          <font-awesome icon="play" class="font-light"/>
          
          <span>Lesson</span>
          <span>Courses</span>
  
      </div>
      <div class="flex flex-row items-center w-full">
        <button :disabled="trendingStartIndex===0" @click="getNewLessons('left')" class="w-[56px] flex items-center justify-center flex-shrink-0 text-4xl hover:text-5xl "><font-awesome icon="chevron-left" v-show="trendingStartIndex!==0 && breakpoints.greater('sm').value"/></button> 
        <div class="flex flex-row w-max overflow-x-auto sm:max-w-full sm:grid sm:flex-grow gap-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <LessonCard v-for="i in numberLessonShow" :key="i" :lesson-number="(i + trendingStartIndex)"/>
        </div>
        <button :disabled="trendingStartIndex===10" @click="getNewLessons('right')" class="w-[56px] flex items-center justify-center flex-shrink-0 text-4xl hover:text-5xl "><font-awesome icon="chevron-right" v-show="trendingStartIndex!==10 && breakpoints.greater('sm').value"/></button> 
      </div>
    </div>
</template>


<script setup>
import LessonCard from './homepage/component/LessonCard.vue';
import {ref, computed} from 'vue'
import { useBreakpoints} from '@vueuse/core'

const breakpoints = useBreakpoints({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
})


const trendingStartIndex = ref(0)

const numberLessonShow = computed(() => {
  if(breakpoints.smaller('sm').value) {return 10}
  else if (breakpoints.between('sm' , 'md').value ) {return 2}
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


const contents = ["Postcard", 'News',  'Health', 'Sports',  'Kids']

const podcastsStartIndex = ref(1)
const newsStartIndex = ref(1)
const foodStartIndex = ref(1)
const travalStartIndex = ref(1)


</script>


<!-- const isMobile = breakpoints.smaller('sm')
const istablets = breakpoints.between('sm' , 'md')
const islaptops = breakpoints.between('md' , 'lg') 
const isdesktops = breakpoints.between('lg' , 'xl') 
const large_desktop = breakpoints.greater('xl') -->