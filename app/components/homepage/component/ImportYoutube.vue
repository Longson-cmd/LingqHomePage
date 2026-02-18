<template>
    <div class="fixed inset-0 h-screen w-full p-4 bg-gray-500/50 flex items-center justify-center">
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
            <div class="flex gap-2 items-center justify-end p-4">
                <button @click="closeBox" class="underline px-3 py-[6px] hover:bg-gray-200 rounded-md">Close</button>
                <button :disabled="!youtubeUrl.trim()" @click="createYoutubeLesson" class="px-3 py-1 underline rounded-md hover:bg-gray-200">Import</button>
            </div>

            <span v-if="warning" class="text-red-600 italic mt-2">Please enter your youtube url</span>
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
import Spiner from './Spiner.vue';
const config = useRuntimeConfig()
const router = useRouter()
const youtubeUrl = ref("")

const emit = defineEmits(["send-message"])

const closeBox = () => {
    emit('send-message', 'closeUpload')
}

const message = ref("")
const importing = ref(false)
const loading = ref(false)
const warning = ref(false)

const createYoutubeLesson = async() => {

    if (!youtubeUrl.value.trim()) {
        warning.value = true
        return
    }
    loading.value = true
    importing.value = true

    const data = {
        'course_name' : 'default',
        'youtube_url' : youtubeUrl.value.trim()
    }
    try {
        const result = await $fetch(`${config.public.apiBase}/create_youtube_lesson/`, {
            method: 'POST',
            body: data ,
            credentials: 'include'
        })

        const course_name = result.course_name
        const lesson_name = result.lesson_name

        router.push({
            path: '/ReaderMain',
            query: {
                lessonName : lesson_name,
                courseName: course_name
            }
        })
    }
    catch (error) {
        message.value = error?.data?.message?? 'Fail to create new lesson!'
    }

    finally {
        loading.value = false
        youtubeUrl.value = ''
    }
}


</script>