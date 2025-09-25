
<template>
  <div class="h-full flex flex-col overflow-hidden">
    <!-- upperpart -->
    <div class="flex h-[80px] p-2 justify-between items-end bg-green-100">
      <font-awesome-icon icon="fa-times" class="text-4xl" />
      <readingSlider v-model:value="progress" :duration="40" class="w-[400px]" />
      <div class="flex items-center gap-2">
        <div class="relative group inline-block">
          <span class="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-full">
            <font-awesome-icon icon="fa-ellipsis-h" class="text-3xl" />
          </span>
          <div class="absolute w-[160px] right-0 bg-white p-2 rounded-md shadow-md
                      space-y-2 z-10 hidden group-hover:block">
            <button class="flex gap-2 w-full hover:bg-gray-200 p-1 rounded-md">
              <img src="/icons/lessonInfo/info.svg" /> Leson Info
            </button>
            <button class="flex gap-2 w-full hover:bg-gray-200 p-1 rounded-md">
              <img src="/icons/lessonInfo/setting.svg" /> settings
            </button>
            <button class="flex gap-2 w-full hover:bg-gray-200 p-1 rounded-md">
              <img src="/icons/lessonInfo/guide.svg" /> Grammar guide
            </button>
          </div>
        </div>

        <button @click="closeSidbar = !closeSidbar">
          <img :src="closeSidbar ? '/icons/sidebarOpen.svg' : '/icons/sidebarClose.svg'"/>
        </button>
      </div>
    </div>

    <!-- lowerpart -->
    <div class="flex flex-1 overflow-hidden min-h-0">
      <div ref="leftBox" class="h-full w-[50px] bg-gray-200 flex items-center justify-center">
        <font-awesome-icon icon="fa-chevron-left" class="text-4xl"/>
      </div>

      <div class="flex flex-1 overflow-hidden min-h-0">
        <readingArea v-if="boxHeight > 0" :boxHeight="boxHeight" :key="boxHeight" />
      </div>

      <div class="h-full w-[50px] bg-gray-200 flex items-center justify-center">
        <font-awesome-icon icon="fa-chevron-right" class="text-4xl"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import readingSlider from '~/composables/readingSlider.vue'
import readingArea from './Middle/readingArea.vue'

const progress = ref(10)
const closeSidbar = ref(true)

const leftBox = ref(null)
const boxHeight = ref(0)

// measure fn used for both mount and resize
const measure = () => {
  if (!leftBox.value) return
  // wait a frame so layout is stable
    const h = Math.round(leftBox.value.getBoundingClientRect().height)
    boxHeight.value = h
    console.log('Left box height:', h)

}

onMounted(async () => {
  await nextTick()
  measure()                         // initial
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measure) // ✅ same ref
})
</script>
