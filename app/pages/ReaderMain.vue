<template>
    <div class="flex flex-col h-screen">
        <HeaderLing />
        <div class="flex flex-1 h-full min-h-0  ">
            <div class="flex flex-1 flex-col">
                <HeaderReader v-model:currentValue="current" v-model:totalValue="total"/>
                <div ref="mainRef" class="flex-1 min-h-0 flex px-3 ">
                    <button @click="current = Math.max(1, current -1)" :class="(current === 1) && 'transparent text-transparent pointer-events-none'" class=" hover:bg-gray-300 px-2 my-20 text-2xl rounded-xl">
                        <font-awesome icon="chevron-left" />
                    </button>
                    <div class="flex-1 min-h-0">
                        <Reader  
                        v-if="boxHeight > 0"
                        :lesson-data="lessondata"
                        :list-sentence="listSentence"
                        :readerHeight="boxHeight" 
                        v-model:current-value="current" 
                        @send-total-page="total = $event"
                        @selected="onSelected"/>
                    </div>
                    <button @click="current = Math.min(total, current + 1)" :class="(current === total) && 'transparent text-transparent pointer-events-none'" class=" hover:bg-gray-300 px-2 my-20 text-2xl rounded-xl">
                        <font-awesome icon="chevron-right" />
                    </button>
                </div>
                <FooterReader />
            </div>

            <Sidebar :word="currentPhrase"/>

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'

import HeaderLing from '~/components/reading/HeaderLing.vue';
import FooterReader from '~/components/reading/FooterReader.vue';
import HeaderReader from '~/components/reading/HeaderReader.vue';
import Sidebar from '~/components/reading/middle/Sidebar.vue';
import Reader from '~/components/reading/middle/Reader.vue';


const mainRef = ref(null)
const boxHeight = ref(0)
const currentPhrase = ref('')
const valided = ref(true)

const lessonName = 'lesson 0'
const current = ref(1)
const total = ref(1)



const messure = () => {
    boxHeight.value = Math.round(mainRef?.value.getBoundingClientRect().height)

}

const lessondata = ref([])
const listSentence = ref([])
const audioURL = ref('')

const getLesson = async () => {
     await $fetch('http://localhost:8000/login/', {
      method: 'POST', 
      body: {
        email: 'test@example.com',
        password: '1234abcd'
      },
      credentials: 'include'
    })

    const {data} = await useFetch(
      'http://localhost:8000/get_lesson/', 
      {
        params: {lesson_name : lessonName},
        credentials: 'include',
        server: false
      }
    )

    lessondata.value = data.value?.lesson_data ?? []
    listSentence.value = data.value?.list_sentences ?? []


    audioURL.value = data.value.audios?.[0]?.audio_url
      ? `http://127.0.0.1:8000${data.value.audios[0].audio_url}`
      : ''
}

const onSelected = (data) => {
    currentPhrase.value = data.text
} 


onMounted(async () => {
    await getLesson()
    messure();
    
    await nextTick();
   
    window.addEventListener('resize', messure)

})

onBeforeUnmount(() => {
    window.removeEventListener('resize', messure)
})


</script>
