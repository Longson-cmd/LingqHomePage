<template>
    <div class="flex flex-row items-center w-full mb-2">
          <button  @click="getNewLessons('left')" class=" w-[12px] md:w-[56px]  flex items-center justify-center flex-shrink-0 text-4xl hover:text-5xl "><font-awesome icon="chevron-left" v-show="startIndex!==0 && !isMobile && data.length - numberGrid > 0"/></button> 
          <div class="flex flex-row w-max overflow-x-auto md:max-w-full md:grid md:flex-grow gap-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            <CourseCard 
            v-for="i in numberLessonShow" :key="i" 
            :lesson-number="data[startIndex + i -1].lessonNumber"
            :lesson-name="data[startIndex + i -1].lessonName"
            :number-new-words="data[startIndex + i -1].numberNewWords"
            :number-ling-qs="data[startIndex + i -1].numberLingQs"
            :number-known-words="data[startIndex + i -1].numberKnownWords"
            :new-words-percents="data[startIndex + i -1].newWordsPercents"
            />
          </div>
          <button  @click="getNewLessons('right')" class="w-[12px] md:w-[56px] flex items-center justify-center flex-shrink-0 text-4xl hover:text-5xl "><font-awesome icon="chevron-right" v-show="startIndex!==data.length - numberGrid && !isMobile && data.length - numberGrid > 0" /></button> 
    </div>
</template>


<script setup>
import CourseCard from './homepage/component/CourseCard.vue';
import {ref, computed, watch} from "vue"
import { useBreakpoints } from '@vueuse/core';
const {dataCards} = useDataLessonCard()

const data = dataCards.slice(0,8)

const startIndex = ref(0)

const breakpoints = useBreakpoints({
    sm: 640,
    md: 768,
    lg: 1024, 
    xl: 1280,
})

const isMobile = computed(() => breakpoints.smaller("md").value)

const numberGrid = computed(() => {
    if (isMobile.value) return data.length
    else if (breakpoints.between("md", "lg").value) return 3
    else if (breakpoints.between("lg", "xl").value) return 4
    else return 5
})

const numberLessonShow = computed(() => {
    if (isMobile.value) return data.length
    
    return data.length - numberGrid.value > 0 ?  numberGrid.value : data.length
})

const getNewLessons = (direction) => {
    if (isMobile.value) return

    if (data.length - numberGrid.value  < 1) {
        startIndex.value = 0
        return
    }
    if (direction === 'left') {
        startIndex.value = Math.max(0, startIndex.value - numberGrid.value)
    }

    else {
        startIndex.value = Math.min(data.length - numberGrid.value, startIndex.value + numberGrid.value)
    }


}

watch([()=> data.length, ()=> isMobile.value, ()=> numberGrid.value], ([newLen, newIsMobile, newNumberGrid]) => {
    if (newIsMobile) return
    if (newLen - newNumberGrid < 1 )  {startIndex.value = 0; return}
    startIndex.value = Math.max(0, Math.min(newLen -newNumberGrid, startIndex.value))
})


</script>