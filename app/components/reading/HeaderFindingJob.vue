<template>
    <div class="h-20 border px-5 flex items-center justify-between">
        <span class="text-blue-500 text-center text-xl font-semibold">
            Reading English app with Youtube sutitles
        </span>

        <button 
        ref="importButtonn" @click="openImport = !openImport"
        class="flex gap-2 border px-3 py-2 rounded-xl items-center justify-center w-36 text-white font-semibold text-lg bg-[#0B1B32] hover:bg-black"
        >
            <img src="/icons/header/import.svg" alt="import icon">
            <span>Import</span>
            <font-awesome icon="chevron-down"/>
            
        </button>
    </div>

    <div v-if="openImport" class="fixed inset-0 top-20 w-full p-4 z-50 bg-gray-300 flex items-center justify-center">
        <div v-if='!importing' class="max-w-[660px] md:w-[660px]  bg-white border border-gray-400 shadow-md rounded-3xl">
            <div class="p-5 flex items-center justify-between">
                <div class="flex items-center gap-1">
                    <img src="/icons/others/link.svg" alt="link">
                    <span>Add Original URL</span>
                </div>
                <button @click="closeBox" class="h-10 w-10 hover:bg-gray-300 rounded-full shrink-0"><font-awesome icon='times'/></button>
            </div>
            <div class="p-4 border-y border-y-gray-300" >
                <input type="text" v-model="youtubeUrl"
                class="px-3 py-2  w-full rounded-lg border border-gray-200 hover:border-gray-400
                placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 focus:shadow-lg"
                placeholder="Add url 500 charaters max">
            </div>
           <div class="flex items-center justify-between pl-4">

                <span :class="['italic', 'mt-2', warning ? 'text-red-600' : 'text-transparent']">Please enter your youtube url</span>
                <div class="flex gap-2 items-center justify-end p-4">
                    <button @click="closeBox" class="underline px-3 py-[6px] hover:bg-gray-200 rounded-md">Close</button>
                    <button  @click="createYoutubeLesson" class="px-3 py-1 underline rounded-md hover:bg-gray-200">Import</button>
                </div>
                
           </div>
        </div>

            <!-- IMPORTING -->
        <div v-else class=" max-w-sm md:max-w-4xl px-3  border bg-white p-5 rounded-2xl">
        <div class="flex justify-between">
            <span class="inline-flex gap-2 ml-3 whitespace-nowrap items-center">
            <img src="/icons/header/importText.svg" alt="importText" >
            <span class="font-bold text-lg">Import Youtube Url</span>
            </span>

            <button @click="closeBox"
            class="h-10 w-10 hover:bg-gray-300 rounded-full flex items-center justify-center"><font-awesome
                icon="times" /></button>
        </div>
        <span class="text-lg inline-block ">
            Your video is importing. Once the first lesson is ready it will open additionall parts continue to import.
        </span>
        <span class="text-lg inline-block mb-5">
            Depending on the speed of your connection and the size of the video, this could take a few minutes.
        </span>

        <Spiner v-if="loading"/>
        <span v-if="message" class=" text-red-600 block text-center">{{ message }}</span>
        </div>
    </div>

    
</template>


<script setup>
import {ref} from 'vue'

const importButton = ref(null)
const openImport = ref(false)

import Spiner from '../homepage/component/Spiner.vue';  
const router = useRouter()
const youtubeUrl = ref('https://www.youtube.com/watch?v=fEY_fmLjHNc')
const loading = ref(false)
const warning = ref(false)
const importing = ref(false)
const message = ref('')

const closeBox = () => {
    openImport.value = false
}

const createYoutubeLesson = async () => {
    if (!youtubeUrl.value.trim()) {
        console.log('Please enter your youtube url')
        warning.value = true
        return
    }

    else if (youtubeUrl.value.trim() !== 'https://www.youtube.com/watch?v=fEY_fmLjHNc') {
        loading.value = true
        importing.value = true
        const data = {
        'course_name' : 'default',
        'youtube_url' : youtubeUrl.value.trim()
    }
        try {
            const result = await $fetch('/api/create_youtube_lesson/', {
                method: "POST",
                body: data,
                credentials: 'include'
            })

            const lesson_name = result.lesson_name
            const course_name = result.course_name

            router.push({
                path: 'FindingJob',
                query: {
                    lessonName: lesson_name,
                    courseName: course_name
                }
            })

        }
        catch (error) {
            message.value = error?.data?.message?? 'Fail to create new lesson!'
        }
    }

    else {
        try{
            const lesson_name = 'How\'s it Going? | Learn English Phrases | Small Talk'
            const course_name = 'default'

            router.push({
                path : 'FindingJob',
                query: {
                    lessonName: lesson_name,
                    courseName: course_name
                }
            })
        }

        catch(error) {
            message.value = error?.data?.message?? 'Fail to create new lesson!'
        }
    }

}


</script>

<!-- https://www.youtube.com/watch?v=fEY_fmLjHNc -->
<!-- How's it Going? | Learn English Phrases | Small Talk -->