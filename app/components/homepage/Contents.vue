<template>
    <div class="flex flex-col py-2 bg-gray-50">
        <div class="flex items-center  flex-gap flex-col md:flex-row px-3 md:px-[56px] mb-2">
            <span class="font-semibold mr-3 self-start">{{props.contentName}} <font-awesome icon='play' class="text-gray-300 text-sm"></font-awesome></span>
            <div class="flex gap-3 self-center">
                <button @click="changeMode('lesson')" :class="mode === 'lesson' && 'font-bold'">Lesson</button>
                <button @click="changeMode('course') " :class="mode === 'course' && 'font-bold'">Course</button>               
            </div>
        </div>

        <div class="flex mb-2">
            <button 
            :disabled="indexStart === 0"
            class="w-[12px] md:w-[56px] flex items-center justify-center text-3xl hover:text-4xl "      
            @click="PreviousCourses">
                <font-awesome icon="chevron-left" v-show="!isMobile && data.length > numberGrid && indexStart !== 0"/>
            </button>

            <div v-if="mode === 'lesson'" class=" w-full flex flex-row overflow-x-auto gap-x-2 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <LessonCard
                v-for="(item , idx) in visibleData" :key="idx"
                :lesson-img-url="item.imgUrl"
                :lesson-number="item.lessonNumber"
                :lesson-name="item.lessonName"
                :number-new-words="item.numberNewWords"
                :number-ling-qs="item.numberLingQs"
                :number-known-words="item.numberKnownWords"
                :new-words-percents="item.newWordsPercents"
                :continuing-lesson="false"
                :builtin-lesson="item.builtinLesson ?? false"
                @add-to-continuting="emit('addToContinuing', $event)"
                @show-course-infos="emit('showCourseInfos', $event)"
                />
            </div>
            <div v-else class=" w-full flex flex-row overflow-x-auto gap-x-2 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <CourseCard
                v-for="(item , idx) in visibleData" :key="idx"
                :course-img-url="item.imgUrl"
                :number-lessons="item.numberLessons"
                :course-name="item.courseName"
                :number-new-words="item.numberNewWords"
                :number-ling-qs="item.numberLingQs"
                :number-known-words="item.numberKnownWords"
                :new-words-percents="item.newWordsPercents"
                @show-course-infos="emit('showCourseInfos', $event)"
                />
            </div>
            
            <button 
            :disabled="indexStart === data.length - numberGrid || data.length <= numberGrid"
            class="w-[12px] md:w-[56px] flex items-center justify-center text-3xl hover:text-4xl "
            @click="NextCourses" >
                <font-awesome icon="chevron-right" v-show="!isMobile && data.length > numberGrid && indexStart !== data.length - numberGrid"/>
            </button>
        </div>
    </div>
</template>


<script setup>
const config = useRuntimeConfig()

import {ref, computed, watch} from 'vue'
import { useBreakpoints } from '@vueuse/core';
// import CourseCard from './homepage/component/CourseCard.vue';
// import LessonCard from './homepage/component/LessonCard.vue';
import CourseCard from './component/CourseCard.vue';
import LessonCard from './component/LessonCard.vue';
const {dataLessonCardsBuitin, dataCourseCardsBuiltin}  = useDataLessonCard()

const props = defineProps({
    contentName : {type: String, default: "Self development"}
})

const emit = defineEmits(['addToContinuing', 'showCourseInfos'])

const data = ref(dataLessonCardsBuitin.slice(0, 8))
const mode = ref("lesson")
const changeMode = (type) => {
    mode.value = type
    if (type === "lesson") data.value = dataLessonCardsBuitin.slice(0,8)
    else  data.value = dataCourseCardsBuiltin.slice(0, 10)

}

const indexStart = ref(0)
const breakpoints = useBreakpoints({
    md: 768,
    lg: 1024,
    xl: 1280,
})

const isMobile = computed(() => breakpoints.smaller("md").value)

const numberGrid = computed(() => {
    if (isMobile.value) return data.value.length
    else if (breakpoints.between("md", "lg").value) return 3
    else if (breakpoints.between("lg", "xl").value) return 4
    else return 5
})

const visibleData = computed(() => {
    if (isMobile.value) return data.value
    return data.value.length - numberGrid.value > 0 ? data.value.slice(indexStart.value, indexStart.value + numberGrid.value) : data.value
})

const PreviousCourses = () => {
    if (isMobile.value) return
    indexStart.value = Math.max(0, indexStart.value - numberGrid.value)
}

const NextCourses = () => {
    if (isMobile.value) return

    if (data.value.length < numberGrid.value) return
    indexStart.value = Math.min(data.value.length - numberGrid.value, indexStart.value + numberGrid.value)
    
}


watch([() => data.value.length, () => isMobile.value, () => numberGrid.value], ([newLen, newIsMobile, newNumberGrid]) => {
    if (newIsMobile) return
    if (newLen < newNumberGrid) {
        indexStart.value = 0
        return
    }

    indexStart.value = Math.max(0, Math.min(newLen - newNumberGrid, indexStart.value))
})




</script>