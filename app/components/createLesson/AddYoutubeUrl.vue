<template>
    <div class="fixed inset-0 h-screen w-full p-4 bg-gray-500/50 flex items-center justify-center">
        <div class="max-w-[660px] md:w-[660px]  bg-white border border-gray-400 shadow-md rounded-3xl">
            <div class="p-5 flex items-center justify-between">
                <div class="flex items-center gap-1">
                    <img src="/icons/others/link.svg" alt="link">
                    <span>Add Original URL</span>
                </div>
                <button @click="emit('closeYoutubeUrl', false)" class="h-10 w-10 hover:bg-gray-300 rounded-full shrink-0"><font-awesome icon='times'/></button>
            </div>
            <div class="p-4 border-y border-y-gray-300" >
                <input type="text" v-model="youtubeUrl"
                class="px-3 py-2  w-full rounded-lg border border-gray-200 hover:border-gray-400
                placeholder:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 focus:shadow-lg"
                placeholder="Add url 500 charaters max">
            </div>
            <div class="flex gap-2 items-center justify-end p-4">
                <button @click="emit('closeYoutubeUrlBox', false)" class="underline px-3 py-[6px] hover:bg-gray-200 rounded-md">Close</button>
                <button :disabled="!youtubeUrl.trim()" @click="emit('sendYoutubeUrl', youtubeUrl)" class="px-3 py-1 border-2 rounded-md hover:border-gray-400">Add</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
const youtubeUrl = ref("https://www.youtube.com/watch?v=d9NZS2P_Va4")

const emit = defineEmits(['sendYoutubeUrl', 'closeYoutubeUrlBox'])

</script>