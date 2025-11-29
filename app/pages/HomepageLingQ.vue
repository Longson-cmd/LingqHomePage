<template>
  <div class="min-h-screen">
    <div class="sticky top-0 bg-white z-10 ">
      <header-ling-q :show-main="showMain" @sending-toggle="showMain = $event"/>
      <div  v-show="!(isMobile && !showMain)"><Toolbar /></div>
  
    </div>
    <div v-show="!(isMobile && !showMain)" class="">
      <LessonParts  />
    </div>
  </div>
</template>


<script setup>
import { useBreakpoints } from '@vueuse/core'
import {ref} from 'vue'
import HeaderLingQ from '~/components/homepage/HeaderLingQ.vue'
import Toolbar from '~/components/homepage/Toolbar.vue'
import LessonParts from '~/components/homepage/LessonParts.vue'

const breakpoints = useBreakpoints({
  md: 768
})
const isMobile = breakpoints.smaller('md')

const showMain = ref(true)



</script>