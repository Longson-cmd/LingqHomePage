<template>
    <div class="relative h-16 border shadow-md flex ">
        <div class="flex items-center px-2">
    
            <div class="flex items-center font-semibold">
                <img src="/icons/header/lingicon.svg" alt="Linglogo" class="h-8 w-8 mr-2" />
                <div class="hidden md:flex">
                    <NuxtLink
                        class="hover:bg-gray-200 h-16 inline-flex justify-center items-center px-1  border-t-4 border-black">
                        Lesson</NuxtLink>
                    <NuxtLink
                        class="hover:bg-gray-200 h-16 inline-flex justify-center items-center px-1 border-t-4 border-transparent">
                        Tutors</NuxtLink>
                    <NuxtLink
                        class="hover:bg-gray-200 h-16 inline-flex justify-center items-center px-1 border-t-4 border-transparent">
                        Community</NuxtLink>
                </div>
            </div>
        </div>
        <RightSide class="ml-auto px-2 z-10 self-center" :show-propgress="false" />
    </div>
</template>



<script setup>
import RightSide from '../homepage/component/RightSide.vue';
</script>