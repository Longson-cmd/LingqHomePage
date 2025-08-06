<script setup>
import Slider from '@vueform/slider'

import { ref } from 'vue'

const value = ref([1, 6])

const level = ["Beginner 1", "Beginner 2", "Intermediate 1", "Intermediate 2", "Advanced 1", "Advanced 2"]
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-50">
    <div class="  w-[448px] px-4 relative">
      <!-- Label and slider -->
      <div class="flex items-center space-x-4 z-10">
        <span class="w-28 text-sm text-gray-600 text-right truncate">{{ level[value[0]-1] }}</span>
        <div>
          <Slider
            v-model="value"
            :min="1"
            :max="6"
            :step="1"
            :range="true"
            :tooltip="false"
        
            class="w-[200px]  "
          />
        </div>
        <span class="w-28 text-sm text-gray-600 text-left truncate">{{ level[value[1]-1] }}</span>
      </div>

      <!-- Tick marks directly under the slider -->
      <div class="absolute left-1/2 translate-x-[-50%] w-[200px] bottom-[-25px] z-0">
        <div class="relative h-10">
          <div class="absolute top-1 left-0 right-0 h-[1px] bg-gray-300"></div>
          <template v-for="(label, index) in level" :key="index">
            <div
              class="absolute flex flex-col items-center text-xs text-gray-600 -translate-x-1/2"
              :style="{ left: `${(index / (level.length - 1)) * 100}%`}"
            >
              <div class="w-px h-4 bg-gray-400 mb-1"></div>

            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>





<!-- Range Slider -->
<!-- npm install @vueform/slider
export default defineNuxtConfig({
  css: [
    '@/assets/css/tailwind.css',
    '@vueform/slider/themes/default.css' // 👈 thêm dòng này thay cho vue3-slider
  ],
  modules: ['@nuxtjs/tailwindcss']
}) -->


<!-- https://github.com/vueform/slider?tab=readme-ov-file -->