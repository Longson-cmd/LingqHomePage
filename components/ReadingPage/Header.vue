<template>
  <div class="w-full p-20 h-32  flex justify-between bg-white">
    <font-awesome-icon icon="fa-times" class="text-3xl" />
    <div class="w-[400px] h-10">
      <!-- Slider -->
      <div class="relative">
        <input type="range" min="0" :max="duration" step="1" v-model="currentTime"
          class="w-full h-1.5 appearance-none rounded cursor-pointer" :style="{ '--progress': percent + '%' }"
          @mouseenter="showTooltip = true" @mouseleave="showTooltip = true" />

        <div v-if="showTooltip" class="absolute w-[48px] -top-8 px-1  text-white text-xs bg-green-500 rounded-xl font-medium 
          flex justify-center items-center" :style="{ left: percent + '%', transform: 'translateX(-40%)' }">
          {{ currentTime }}/{{ duration }}
        </div>
      </div>


      <div class="flex justify-between text-xs my-1">
        <p class=""> {{ currentTime }}s</p>
        <p class=""> {{duration }}</p>
      </div>
    </div>

    <button @click="toggleSidebar">
      <img :src="closeSidebar ? '/icons/sidebarClose.svg' : '/icons/sidebarOpen.svg'" alt="sidebarOpen" />
    </button>
  </div>
</template>

<script setup>

import readingSlider from '~/composables/readingSlider.vue';
import { ref ,computed, watch} from 'vue'


const closeSidebar = ref(false)
const toggleSidebar = () => {
  closeSidebar.value = !closeSidebar.value
}

const currentTime = ref(10)
const showTooltip = ref(true)
const duration = 40


watch(currentTime, (newVal) => {
  console.log('Slider moved, new currentTime =', newVal)
})
const percent = computed(() =>
  duration > 0 ? (currentTime.value / duration) * 100 : 0
)

</script>



<style scoped>
/* Track */
input[type="range"]::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(
    to right,
    #3b82f6 var(--progress, 0%),
    #e5e7eb var(--progress, 0%)
  );
}

input[type="range"]::-moz-range-track {
  height: 6px;
  border-radius: 9999px;
  background: linear-gradient(
    to right,
    #3b82f6 var(--progress, 0%),
    #e5e7eb var(--progress, 0%)
  );
}

/* Thumb */
input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: #3b82f6;
  cursor: pointer;
  margin-top: -5px;
  transition: transform 0.15s ease; 
  pointer-events: auto; 
}

input[type="range"]:hover::-webkit-slider-thumb {
  transform: scale(1.3);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: #3b82f6;
  cursor: pointer;
}
</style>


