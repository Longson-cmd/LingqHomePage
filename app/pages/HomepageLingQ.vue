<template>
  <div class="sticky top-0 bg-white">
    <header-ling-q :show-main="showMain" @sending-toggle="showMain = $event"/>
    <div v-show="!(isMobile && !showMain)"><Toolbar/></div>

  </div>
  <div v-show="!(isMobile && !showMain)" class="bg-green-200 h-screen"></div>
</template>


<script setup>
import { useBreakpoints } from '@vueuse/core'
import {ref} from 'vue'
import HeaderLingQ from '~/pages/homepage/HeaderLingQ.vue';
import Toolbar from '~/pages/homepage/Toolbar.vue';


const breakpoints = useBreakpoints({
  md: 768
})
const isMobile = breakpoints.smaller('md')

const showMain = ref(true)


watch(isMobile, (newValue) => {
  console.log('isMobile.value : ', newValue)
},  1000)

watch(showMain, (newValue) => {
  console.log('showMain : ', newValue)
})
</script>