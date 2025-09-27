<template>
  <div class="h-full flex flex-col overflow-hidden bg-gray-50 p-2">
  
    <!-- upperpart -->
    <div class="flex h-[80px] px-3 py-2 justify-between items-center ">
      <NuxtLink to="/HomePage" class="h-10 w-10 hover:bg-gray-200 rounded-md">
        <font-awesome-icon icon="fa-times" class="text-4xl" />
      </NuxtLink>
      
      <readingSlider  v-model:value="currentPage" :duration="totalPage" class="w-[400px]" />
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

        <button @click="toggleSidebar">
          <img :src="closeSidebar ? '/icons/sidebarOpen.svg' : '/icons/sidebarClose.svg'"/>
        </button>
      </div>
    </div>

    <!-- lowerpart -->
    <div class="flex flex-1 overflow-hidden min-h-0 p-2">
      <button @click="prevPage" ref="leftBox" 
      :class="['h-full w-[50px] hover:bg-gray-200 rounded-md flex items-center justify-center',
        currentPage === 1 ? 'invisible' :''
      ]">
        <font-awesome-icon icon="fa-chevron-left" class="text-4xl"/>
      </button>

      <div class="flex flex-1 overflow-hidden min-h-0">
        <readingArea v-if="boxHeight > 0" :openPopUp="closeSidebar" :currentPage="currentPage" :boxHeight="boxHeight" :key="`area-${boxHeight}-${toggleCount}`" @update="handleUpdate" />
      </div>

      <button @click="nextPage" 
      :class="['h-full w-[50px] hover:bg-gray-200 rounded-md flex items-center justify-center',
        currentPage === totalPage ? 'invisible' :''
      ]"
      >
        <font-awesome-icon icon="fa-chevron-right" class="text-4xl"/>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import readingSlider from '~/composables/readingSlider.vue'
import readingArea from './Middle/readingArea.vue'

const currentPage = ref(1)
const totalPage = ref(1)


const handleUpdate = (data) => {
  currentPage.value = data.page 
  totalPage.value = data.total 
}

const prevPage = () => {
  if (currentPage.value > 1 && currentPage.value <= totalPage.value) {
    currentPage.value -=1
  }
}

const nextPage = () => {
  if (currentPage.value >= 1 && currentPage.value < totalPage.value) {
    currentPage.value +=1
  }

    console.log('totalPage :', totalPage.value)
}

const closeSidebar = ref(false)

const leftBox = ref(null)
const boxHeight = ref(0)

// measure fn used for both mount and resize
const measure = () => {
  if (!leftBox.value) return
  // wait a frame so layout is stable
    const h = Math.round(leftBox.value.getBoundingClientRect().height)
    boxHeight.value = h
    // console.log('Left box height:', h)

}

const emit = defineEmits(['sendtoggleSidebar'])

const toggleCount = ref(1)
const toggleSidebar =async () => {
  closeSidebar.value = !closeSidebar.value
  emit('sendtoggleSidebar', closeSidebar.value)
  console.log('closeSidebar ', closeSidebar.value)
  toggleCount.value++            // 👈 force destroy + recreate readingArea
  await nextTick()

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


<!-- <template>
  <div class="h-screen flex flex-col overflow-hidden">
 
    <header class="shrink-0">
      <HomeHeader />
    </header>

 
    <main class="flex flex-1 overflow-hidden">
  
      <div class=" flex flex-1 flex-col ">
        <div class="flex-1 overflow-hidden ">
          <ReadingMain @sendtoggleSidebar="handleOpenSidebar"/>
        </div>
        <Footter class="shrink-0" />
      </div>


      <side-bar v-if="SidebarOpen"  class="w-[400px] overflow-y-auto px-3" />
    </main>
  </div>
</template> -->

<!-- <script setup>
import {ref} from 'vue'
import HomeHeader from "~/components/HomePage/HomeHeader.vue";
import sideBar from "~/components/ReadingPage/sideBar.vue";
import Footter from "~/components/ReadingPage/Footter.vue";
import ReadingMain from "./ReadingPage/ReadingMain.vue";

const SidebarOpen = ref(true)

const handleOpenSidebar = (data) => {
  SidebarOpen.value = !data
  console.log('sidebarOpen :', SidebarOpen.value)
}
</script> -->
