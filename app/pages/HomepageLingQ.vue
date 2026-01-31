<template>
  <div class="min-h-screen">
    <div class="sticky top-0 bg-white z-20 ">
      <header-ling-q :show-main="showMain" @sending-toggle="showMain = $event"/>
      <div  v-show="!(isMobile && !showMain)"><Toolbar /></div>
  
    </div>
    <div v-show="!(isMobile && !showMain)" class="">
      <ContinueStudying  />
      <Contents 
      v-for="(content, idx) in listContents" :key="idx"
      :content-name="content"
      />

      
    </div>
  </div>
</template>


<script setup>
import { useBreakpoints } from '@vueuse/core'
import {ref} from 'vue'
import HeaderLingQ from '~/components/homepage/HeaderLingQ.vue'
import Toolbar from '~/components/homepage/Toolbar.vue'
import ContinueStudying from '~/components/homepage/ContinueStudying.vue'
import Contents from '~/components/homepage/Contents.vue'
const breakpoints = useBreakpoints({
  md: 768
})
const listContents = ["Bussiness", "History", "Book","Podcast", "Culture"]

const isMobile = breakpoints.smaller('md')

const showMain = ref(false)



</script>