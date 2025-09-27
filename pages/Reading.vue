<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <!-- Header stays at top -->
    <header class="shrink-0">
      <HomeHeader />
    </header>

    <!-- Main fills the rest -->
    <main class="flex flex-1 overflow-hidden">
      <!-- Content area -->
      <div class=" flex flex-1 flex-col min-w-0">
        <div class="flex-1 overflow-hidden min-w-0">
          <!-- TEXT CONTENT -->
          <div class="h-full flex flex-col overflow-hidden bg-gray-50 p-2">
            <!-- upperpart -->
            <div class="flex h-[80px] px-3 py-2 justify-between items-center ">
              <NuxtLink NuxtLink to="/HomePage" class="flex justify-center items-center h-10 w-10 hover:bg-gray-200 rounded-md">
                <font-awesome-icon icon="fa-times" class="text-4xl" />
              </NuxtLink>

              <readingSlider v-model:value="currentPage" :duration="totalPage" class=" block sm:w-[300px] md:w-[400px]" />
              <div class="flex items-center gap-2">
                <div class="relative group inline-block">
                  <span class="h-10 w-10 hover:bg-gray-200 flex items-center justify-center rounded-full">
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

                <button @click="toggleSidebar" class="hidden lg:block">
                  <img :src="closeSidebar ? '/icons/sidebarOpen.svg' : '/icons/sidebarClose.svg'" />
                </button>
              </div>
            </div>

            <!-- lowerpart -->
            <div class="flex flex-1 overflow-hidden min-h-0 p-2">
              <div ref="leftBox" :class="['h-full w-[50px]  rounded-md flex items-center justify-center',
                currentPage === 1 ? 'invisible' : ''
              ]">
                <button @click="prevPage" class="h-12 w-12 hover:bg-gray-200 rounded-full">
                   <font-awesome-icon icon="fa-chevron-left" class="text-4xl font-light" />
                </button>            
              </div>

              <div class="flex flex-1 overflow-hidden min-h-0">
                <readingArea v-if="boxHeight > 0" :openPopUp="closeSidebar" :currentPage="currentPage"
                  :boxHeight="boxHeight" :key="`area-${boxHeight}-${toggleCount}`" @update="handleUpdate" @send-word="handlesendWord"/>
              </div>

              <div  :class="['h-full w-[50px] rounded-md flex items-center justify-center',
                currentPage === totalPage ? 'invisible' : ''
              ]">
              <button @click="nextPage" class="h-12 w-12 hover:bg-gray-200 rounded-full">
                 <font-awesome-icon icon="fa-chevron-right" class="text-4xl" />
              </button>          
              </div>
            </div>
          </div>
        </div>
        <Footter class="shrink-0" />
      </div>

      <!-- Sidebar with independent scroll -->
      <side-bar v-if="!closeSidebar" :newWord="Word" class="w-[360px] shrink-0 hidden lg:flex flex-none overflow-y-auto px-2" />
    </main>
  </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import readingSlider from '~/composables/readingSlider.vue'
import readingArea from '~/components/ReadingPage/Middle/readingArea.vue'
import HomeHeader from "~/components/HomePage/HomeHeader.vue";
import sideBar from "~/components/ReadingPage/sideBar.vue";
import Footter from "~/components/ReadingPage/Footter.vue";

const Word = ref('Unrestrained')

const handlesendWord  = (data) => {
  Word.value = data
}

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


const toggleCount = ref(1)
const toggleSidebar =async () => {
  closeSidebar.value = !closeSidebar.value
  console.log('closeSidebar ', closeSidebar.value)
  toggleCount.value++            // 👈 force destroy + recreate readingArea
  await nextTick()
}


onMounted(() => {
  const mq = window.matchMedia('(min-width: 1024px)') // Tailwind lg
  const apply = () => {
    // below lg → component is hidden by CSS → close in state too
    if (!mq.matches) closeSidebar.value = true
  }
  apply()
  mq.addEventListener?.('change', apply) || mq.addListener(apply)
  onBeforeUnmount(() => {
    mq.removeEventListener?.('change', apply) || mq.removeListener(apply)
  })
})
onMounted(async () => {
  
  await nextTick()
  measure()                         // initial

  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measure) // ✅ same ref
})

</script>