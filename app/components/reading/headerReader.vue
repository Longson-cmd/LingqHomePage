<template>
  <div class=" h-14  flex justify-between items-end px-3">
    <NuxtLink class="h-10 w-10 hover:hover:bg-gray-300 rounded-full flex items-center justify-center">
      <font-awesome icon="times" class="text-xl"/>
    </NuxtLink>

    <div class="max-w-xl w-full px-5">
      <readingSiler :input-max="totalPage" v-model:input-value="currentPage" />
    </div>
    

    <div class="flex items-start flex gap-2 ">
      <button class="h-10 w-10  hover:hover:bg-gray-300 rounded-full">
        <font-awesome icon="ellipsis-h" />
      </button>
      <button
      @click="openSidebar = !openSidebar"
      class="h-10 w-10 hover:hover:bg-gray-300 flex justify-center items-center">
        <img :src="openSidebar ? '/icons/reader/openSidebar.svg' : '/icons/reader/closeSidebar.svg'" alt="togglesidebar" class="h-8 w-8">
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import readingSiler from './component/readingSiler.vue';

const openSidebar = ref(false)

const props = defineProps({
  currentValue: {type: Number, default: 1},
  totalValue : {type: Number, default: 1}
})

const emit = defineEmits([
  'update:currentValue',
  'update:totalValue'
])


const currentPage = computed({
  get: () => props.currentValue,
  set: (v) => {
    if (v !== props.currentValue) {
      emit('update:currentValue', v)
    }
  }
})

const totalPage = computed({
  get: () => props.totalValue,
  set: (v) => {
    if (v !== props.totalValue) {
      emit('update:totalValue', v)
    }
  }
})


</script>