<template>
  <div class="h-full flex flex-col overflow-hidden bg-gray-50">
  
    <!-- upperpart -->
    <div class="flex h-[64px] px-2 pb-5 justify-between items-end">
      <font-awesome-icon icon="fa-times" class="text-4xl" />
      <readingSlider v-if="text" v-model:value="currentPage" :duration="totalPage" class="w-[400px]" />
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
    <div class="flex flex-1 overflow-hidden min-h-0 p-2">
      <button @click="prevPage" ref="leftBox" 
      :class="['h-full w-[50px] hover:bg-gray-200 rounded-md flex items-center justify-center',
        currentPage === 1 ? 'invisible' :''
      ]">
        <font-awesome-icon icon="fa-chevron-left" class="text-4xl"/>
      </button>

      <div class="flex flex-1 overflow-hidden min-h-0">
        <readingArea v-if="boxHeight > 0" :currentPage="currentPage" :boxHeight="boxHeight" :key="boxHeight" @update="handleUpdate" ref="text"/>
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
const text = ref(null)

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
}

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
  console.log('totalPage :', totalPage.value)
  measure()                         // initial
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measure) // ✅ same ref
})
</script>
