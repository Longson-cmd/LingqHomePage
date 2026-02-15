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
                        :current-phrase-status="currentPhraseData.status"
                        :status-tags-meanings="statusTagsMeanings"
                        :core-data="core_data"
                        v-model:current-value="current" 
                        @send-total-page="total = $event"
                        @selected="onSelected"
                        @send-status-from-reader="currentPhraseData.status = $event"
                        />
                    </div>
                    <button @click="current !== total? (current = Math.min(total, current + 1)): finishLesson()" 
                    :class="(current === total) && ' hover:bg-transparent '" 
                    class=" hover:bg-gray-300 px-2 my-20 text-2xl rounded-xl ">
                        <!-- <font-awesome :icon="current !==total ? 'chevron-right' : 'fa-check'" /> -->
                        <font-awesome v-if="current !==total" icon="chevron-right" />
                        <span v-else  class="h-10 w-10 hover:bg-gray-200 rounded-full">
                            <font-awesome  icon="fa-check"  class="text-green-500"/>
                        </span>
                        
                    </button>
                   
                </div>
                <FooterReader 
                    @pointerdown.stop
                    @pointermove.stop
                    @pointerup.stop
                />
            </div>

                <Sidebar
                    @click.stop
                    @pointerdown.stop
                    @pointermove.stop
                    @pointerup.stop
                    v-model:sidebar-data="currentPhraseData"
                    @update-previous="handleUpdatePrevisous"
                />

        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'

import HeaderLing from '~/components/reading/HeaderLing.vue';
import FooterReader from '~/components/reading/FooterReader.vue';
import HeaderReader from '~/components/reading/HeaderReader.vue';
import Sidebar from '~/components/reading/middle/Sidebar.vue';
import Reader from '~/components/reading/middle/Reader.vue';

const mainRef = ref(null)
const boxHeight = ref(0)


const current = ref(1)
const total = ref(1)

const messure = () => {
    boxHeight.value = Math.round(mainRef?.value.getBoundingClientRect().height)

}


const lessondata = ref( [])
const listSentence = ref([])
const core_data = ref([])
const statusTagsMeanings = ref({})
const audioURL = ref('')



const route = useRoute()
const lesson_name = computed(() => route.query.lessonName || 'Default lesson')
const course_name = computed(() => route.query.courseName || 'Quick import')
const getLesson = async () => {
    console.log('lesson_name', lesson_name.value)
    const data = await $fetch('http://3.26.146.123:8000/get_lesson/', {
        method : "GET",
        query: {
            lesson_name : lesson_name.value,
            course_name : course_name.value
        },
        credentials : 'include'
    })

    lessondata.value = data.lesson_data ?? []
    listSentence.value = data.list_sentences ?? []
    statusTagsMeanings.value = data.Tags_Meanings ?? {}
    core_data.value = data.core_data?? []

    //   console.log("lessondata.value", lessondata.value[1])
    // audioURL.value = data.value.audios?.[0]?.audio_url
    //   ? `http://127.0.0.1:8000${data.value.audios[0].audio_url}`
    //   : ''
}

const currentPhraseData = ref({
    phrase: 'breakfast',
    tags: ["demo"],
    your_meanings: [],
    global_tags : [],
    global_meanings: [],
    status: 6
})


watch(currentPhraseData, (newVal) => {
    if (newVal.phrase.split(" ").length > 1 && newVal.status === 6) return

    if (newVal.phrase.split(" ").length > 1 && newVal.status === 0) { delete statusTagsMeanings.value[newVal.phrase]}
    statusTagsMeanings.value[newVal.phrase] = {
        "tags": newVal.tags,
        "your_meanings": newVal.your_meanings,
        "global_tags": newVal.global_tags,
        "global_meanings": newVal.global_meanings,
        "status": newVal.status,
    }

    

}, {deep: true})



const handleUpdatePrevisous = (data) => {
    statusTagsMeanings.value[data.phrase].your_meanings = data.your_meanings
    statusTagsMeanings.value[data.phrase].status = data.status
}

const onSelected = (data) => {
  
    currentPhraseData.value = {
        phrase : data.text,
        tags : statusTagsMeanings.value[data.text]?.tags?? [],
        your_meanings : statusTagsMeanings.value[data.text]?.your_meanings?? [],
        global_tags : statusTagsMeanings.value[data.text]?.global_tags?? [],
        global_meanings : statusTagsMeanings.value[data.text]?.global_meanings?? [],
        status : statusTagsMeanings.value[data.text]?.status?? 6,
    }
} 


const router = useRouter()
const finishLesson = async () => {
    
    const statusDict = {}
    const listKeys = Object.keys(statusTagsMeanings.value)
    for (const item of listKeys) {
        statusDict[item] = statusTagsMeanings.value[item].status
    }
  

   try {
        await $fetch('http://3.26.146.123:8000/finish_lesson/', {
            method: "PUT", 
            body: statusDict,
            credentials: "include"
        })

        router.push('/HomepageLingQ')
   }

   catch(error) {
        console.log("there is an error with finish lesson", error)
   }
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
