<template>
    <div class="flex flex-col py-2 bg-gray-50">
        <div class="flex items-center  flex-gap flex-col md:flex-row px-3 md:px-[56px] mb-2">
            <span class="font-semibold mr-3 self-start">Continue Studying <font-awesome icon='play' class="text-gray-300 text-sm"></font-awesome></span>
            <div class="flex gap-3 self-center">
                <button @click="changeMode('lesson')" :class="mode === 'lesson' && 'font-bold'">Lesson</button>
                <button @click="changeMode('course') " :class="mode === 'course' && 'font-bold'">Course</button>
                <button @click="mode = 'importLesson'">Imported Lesson</button>
            </div>
        </div>

        <div class="flex mb-2">
            <button 
            :disabled="indexStart === 0"
            class="w-[12px] md:w-[56px] flex items-center justify-center text-3xl hover:text-4xl "      
            @click="PreviousCourses">
                <font-awesome icon="chevron-left" v-show="!isMobile && data.length > numberGrid && indexStart !== 0"/>
            </button>
            <div v-if="mode === 'course'" class=" w-full flex flex-row overflow-x-auto gap-x-2 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <CourseCard
                v-for="(item , idx) in visibleData" :key="idx"
                :course-img-url="item.imgUrl"
                :number-lessons="item.numberLessons"
                :course-name="item.courseName"
                :number-new-words="item.numberNewWords"
                :number-ling-qs="item.numberLingQs"
                :number-known-words="item.numberKnownWords"
                :new-words-percents="item.newWordsPercents"
                @delete-course="removeCourse"
                @show-course-infos="emit('showCourseInfos', $event)"
                />
            </div>
            <div v-else class=" w-full flex flex-row overflow-x-auto gap-x-2 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <LessonCard
                v-for="(item , idx) in visibleData" :key="idx"
                :course-name="item.courseName"
                :lesson-img-url="item.imgUrl"
                :lesson-number="item.lessonNumber"
                :lesson-name="item.lessonName"
                :number-new-words="item.numberNewWords"
                :number-ling-qs="item.numberLingQs"
                :number-known-words="item.numberKnownWords"
                :new-words-percents="item.newWordsPercents"
                :continuing-lesson="true" 
                :builtin-lesson="item.builtinLesson ?? false"
                @remove-from-continuing="removeLesson"
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


import {ref, computed, watch, onMounted} from 'vue'
import { useBreakpoints } from '@vueuse/core';
// import CourseCard from './homepage/component/CourseCard.vue';
// import LessonCard from './homepage/component/LessonCard.vue';
import CourseCard from './component/CourseCard.vue';
import LessonCard from './component/LessonCard.vue';

// const data = ref(dataLessonCards.slice(0, 8))
const data = ref([])
const dataLessonCards = ref([])
const dataCourseCards = ref([])

const props = defineProps({
    newLessonData : {type : Object, default: () => ({})}
})

const emit = defineEmits(['showCourseInfos'])

const {
        dataLessonCardsBuitin,
        dataCourseCardsBuiltin,
        dataLessonCardsDemo,
        dataCourseCardsDemo
    } = useDataLessonCard()

const getCardsData = async () => {

    console.log('GET DATA FOR LESSON AND COURSE CARDS')
    try {
        const dataBackend = await $fetch('http://3.26.146.123:8000/continue_study/', {
        method: "GET", 
        credentials: "include" 
        
    })

    dataLessonCards.value = dataBackend?.["dataLessonCards"] ?? dataLessonCardsDemo
    dataCourseCards.value = dataBackend?.["dataCourseCards"] ?? dataCourseCardsDemo
    data.value = dataLessonCards.value
}
    catch (error) {
        dataLessonCards.value = dataLessonCardsDemo 
        dataCourseCards.value = dataCourseCardsDemo
        data.value = dataLessonCards.value
    }
 
}


const mode = ref("lesson")
const changeMode = (type) => {
    mode.value = type
    if (type === "lesson") {
        if (dataLessonCards.value.length === 0 ) {
            data.value = dataLessonCardsBuitin
        }
        else {
            data.value = dataLessonCards.value
        }
        
    }
    else if (type === "course") {
        if (dataCourseCards.value.length === 0) {
            data.value = dataCourseCardsBuiltin
        }
        else {
            data.value = dataCourseCards.value
        }
    }
    else data.value = dataLessonCards.value.slice(0,4)
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

watch(() => props.newLessonData, (newVal) => {
  
   
    const index = dataLessonCards.value.findIndex(item => item.lessonName === newVal.lessonName && item.courseName === newVal.courseName)
    if (index !== -1) {
        dataLessonCards.value.splice(index, 1)
        dataLessonCards.value.unshift(newVal)
        data.value = dataLessonCards.value
    }

    else {
        dataLessonCards.value.unshift(newVal)
        data.value = dataLessonCards.value
    }
}, {deep: true})


const removeLesson = (childData) => {
    dataLessonCards.value = dataLessonCards.value.filter(card => !(card.lessonName === childData.lessonName && card.courseName === childData.courseName))

    if (dataLessonCards.value.length === 0) {
        data.value = dataLessonCardsDemo
    }
    else {
        data.value = dataLessonCards.value
    }
}




const removeCourse = (courseDelete) => {
 
    dataLessonCards.value = dataLessonCards.value.filter(card => card.courseName !== courseDelete)
    dataCourseCards.value = dataCourseCards.value.filter(card => card.courseName !== courseDelete)
    
    if (dataCourseCards.value.length === 0) {
        data.value = dataCourseCardsDemo
    }
    else {
        data.value = dataCourseCards.value
    }
}

onMounted(async () => {
    await getCardsData()
  
})



</script>