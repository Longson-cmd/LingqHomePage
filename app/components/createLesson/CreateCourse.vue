<template>
    <div class="fixed inset-0 h-screen w-full flex items-center justify-center shadow-lg bg-gray-500/50 z-20 ">
        <div class="max-w-[600px] md:w-[600px] flex flex-col p-5 gap-3 rounded-2xl border-2 border-gray-400 bg-white shadow-md">
            <div class="flex justify-between items-start">
                <button @click="() => emit('closeBox', false)" class="flex items-center justify-center"><font-awesome icon="chevron-left"/>back</button>
                <div class="flex flex-col items-end">
                    <button @click="saveCourse" class="px-3  w-16 py-2 bg-[#0B1B32] hover:bg-black font-medium text-white rounded-md">
                        Save
                    </button>

                    <span v-if="messageError" class="text-sm text-red-600 italic">{{messageError}}</span>
                </div>
            </div>

            <div class="flex flex-col gap-2">
                <span class="text-lg font-semibold text-blue-600">Course name</span>
                <input type="text" v-model="courseName"
                @input="showWarning = false"
                class="border hover:border-gray-400 px-3 py-2 rounded-md w-full
                placeholder:text-gray-700  focus:outline-none focus:ring-2 focus:ring-gray-300
                focus:shadow-lg focus:border-gray-400"
                placeholder="Add title 60 charaters max"   
                >
                <span v-show="showWarning" class="text-sm text-red-500 italic">Requied</span>
                <textarea type="text" v-model="courseDescription"
                class="border hover:border-gray-400 mt-3 px-3 py-2 rounded-md w-full
                placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300
                focus:shadow-md focus:border-gray-400"
                placeholder="Add description 200 charaters max (optional)"
                />
            </div>
           
            <!-- add Picture -->
            <span>
                <label class="cursor-pointer inline-block">
                    <input type="file" accept=".png, .jpg" @change="uploadPicture" class="sr-only">
                    <div 
                    v-if="!pictureUrl"
                    class="w-[196px] h-[126px] p-2 flex flex-col justify-between 
                    border rounded-lg bg-gray-100 hover:bg-gray-300"
                    >
                        <Picture class="h-6 w-6 text-gray-400 self-end"/>
                        <font-awesome icon="plus" class="h-5 w-5 self-center"/>
                        <span class="text-sm text-center font-medium text-gray-500">Add image</span>
                    </div>
                    <img v-else :src="pictureUrl" alt="pictureUrl" class="h-[126px] w-[126px] object-cover rounded-full">
                </label>
            </span>


            <!-- toggle choose level -->
            <div class="relative" ref="refChooseLevel">
                <button @click="openSelectLevel = !openSelectLevel" class="border bg-gray-100 hover:bg-gray-300 px-3 py-1 rounded-md w-full flex items-center justify-between">
                    <span class="font-medium text-gray-700">{{idxLevel === -1 ? 'level': listLevels[idxLevel]}}</span>
                    <font-awesome icon="chevron-down"/>
                </button>

                <div v-show="openSelectLevel" class="absolute bg-white z-10 w-40 border border-gray-300 shadow-md rounded-2xl overflow-hidden">
                    <span class="px-3 py-1 bg-gray-100 block">Level</span>
                    <button 
                    @click="idxLevel = idx; openSelectLevel = false"
                    v-for="(level, idx) in listLevels"
                    class="px-3 py-1  w-full text-start hover:bg-gray-100"
                    :class="idxLevel === idx && 'bg-gray-100'"
                    >
                        {{level}}
                    </button>
                </div>
            </div>
         
        </div>
    </div>
</template>


<script setup>

import Picture from '../UI/Picture.vue';
// import Picture from './UI/Picture.vue'
import {ref, onMounted, onBeforeUnmount} from 'vue'

const courseName = ref("")
const courseDescription = ref("")
const showWarning = ref(false)
const messageError = ref("")

const refChooseLevel = ref(null)
const pictureFile = ref(null)
const pictureUrl = ref('')

const uploadPicture = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (pictureFile.value) URL.revokeObjectURL(pictureFile.value)

    pictureFile.value = file
    pictureUrl.value = URL.createObjectURL(pictureFile.value)
}

const emit = defineEmits(["sendDataCourse", "closeBox"])

const listLevels = ["Beginner 1", "Beginner 2", "Intermediate 1", "Intermediate 2", "Advanced 1", "Advanced 2"]
const idxLevel = ref(-1)
const openSelectLevel = ref(false)

const saveCourse = async () => {
    showWarning.value = false
    messageError.value = ""
    const titleText = courseName.value.trim()
    if (!titleText) {showWarning.value = true; return}

    const formData = new FormData()
    formData.append("course_name", titleText)
    if (idxLevel.value !== -1) formData.append("course_level", listLevels[idxLevel.value])
    if (courseDescription.value) formData.append("course_description", courseDescription.value.trim())
    if (pictureFile.value) formData.append("course_picture", pictureFile.value)

    try {      
        // await $fetch("http://localhost:8000/create_course", {
        //     method: "POST",
        //     body: formData,
        //     credentials: "include"
        // })
        emit("sendDataCourse", {
            "courseName": courseName.value,
            "pictureUrl": pictureUrl.value
        })

        emit("closeBox", false)

        courseName.value = ""
        pictureFile.value = null
        pictureUrl.value = ""
        idxLevel.value = -1
        courseDescription.value = ""     

    }

    catch (error) {
        messageError.value = error?.data?.message??  'Can\'t create this course'
        console.error(error)
    }
}


const handleClickOutsides = (e) => {
    if (refChooseLevel.value && !refChooseLevel.value.contains(e.target)) {
        openSelectLevel.value = false
    }
}


onMounted(() => window.addEventListener("click", handleClickOutsides))
onBeforeUnmount(() => window.removeEventListener("click", handleClickOutsides))

</script>

