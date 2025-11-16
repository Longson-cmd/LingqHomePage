<template>
  <div class="w-full my-10 h-20 xl:h-72 border p-2 md:p-[56px] flex flex-col xl:flex-row items-center justify-between gap-3">
    <div class="border  rounded-lg border-gray-300 w-full lg:w-[250px] flex inline-block">
      <input type="text" placeholder="Search Library" class="placeholder-black  p-2 flex-1 focus:outline-none hover:border border border-transparent hover:border-gray-900 rounded-l-lg">
      <button class="border border-transparent hover:border hover:border-gray-800 hover:text-lg rounded-r-lg flex w-10  items-center justify-center"><font-awesome icon="search" /></button>
    </div>

    <!-- SLIDER -->
    <div class="flex flex-col md:flex-row max-w-[430px] items-center gap-2 text-sm md:text-base font-medium ">
      <div class="flex justify-between  w-[320px] md:w-[120px] whitespace-nowrap md:py-1">
        <span>{{ Levels[range[0] -1] }}</span>
        <span class="md:hidden">{{ Levels[range[1] -1] }}</span>
      </div>

      <div class="w-[330px]  bg-green-200 flex flex-col gap-10 relative group">
        <div><Slider v-model="range" :min="1" :max="6" :tooltips="false" :step="1" class="my-slider" /></div>

        <!-- hidden  group-hover:block hover:bg-gray-200  -->

        <div class="absolute hidden  group-hover:block w-full -translate-y-1/2 ">
          <div class="relative h-20   ">
            <!-- <div class="w-full h-1 bg-red-200"></div> -->
            <div v-for="i in 6">    
              <div class="absolute h-6 w-1 rounded-ms bg-gray-300 -translate-x-1/2 bottom-6" :style="{left: `${(i - 1) * 20}%`}"></div>
            </div>
          </div>
        </div>


      </div>

      <span class="hidden md:inline md:w-[120px] whitespace-nowrap  py-1">{{ Levels[range[1] -1] }}</span>
    </div>

    <button class="flex self-end gap-2 border px-3 py-2  rounded-xl items-center justify-center w-36 text-white font-semibold text-lg bg-[#0B1B32]">
      <img src="/icons/header/import.svg" alt="import icon"/>
      <span>Import</span>
      <font-awesome icon="chevron-down"/>
    </button>

   
  </div>


</template>

<script setup>
import { ref } from 'vue'
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'

const range = ref([3, 5])
const Levels = ["Beginner 1", "Beginner 2", "Intermediate 1", "Intermediate 2", "Advanced 1", "Advanced 2"]
</script>




<style>
/* Target the slider handle (the draggable circle) inside this component */
.my-slider .slider-handle {
  /* Make the handle have a black border (2px thickness) */
  border: 1px solid black !important;
  transition: transform 0.15s ease-in-out;
  /* smooth animation */
  /* Make the handle background white */
  background: rgb(245, 243, 243) !important;
  border: 2px solid black !important;
}

/* enlarge on hover */
.my-slider .slider-handle:hover {
  transform: scale(2);
  /* 25% bigger */
}

/* Target the "connected" filled part between the two handles */
.my-slider .slider-connect {
  /* Make the connecting bar black */
  background-color: rgb(24, 3, 3) !important;
}

/* Target the handle when it is focused (clicked or keyboard-selected) */
.my-slider .slider-handle:focus {
  /* Remove the default blue outline glow */
  box-shadow: none !important;
}



.my-slider {
  max-width: 330px;
  /* same as Tailwind's max-w-md */
  margin: 0 auto;
  /* center it */
}
</style>
