<template>
    <div  class="flex flex-col h-screen">
        <HeaderFindingJob />
        <div v-if="!loading" class="flex flex-1 h-full min-h-0  pr-5">
            <div class="flex flex-1 flex-col">
                <HeaderReader v-model:currentValue="current" v-model:totalValue="total"/>
                <div ref="mainRef" class="flex-1 min-h-0 flex px-3 ">
                    <button
                        type="button"
                        @click="current = Math.max(1, current -1); $event.currentTarget.blur()"
                        :class="(current === 1) && 'transparent text-transparent pointer-events-none'"
                        class=" hover:bg-gray-300 px-2 my-20 text-2xl rounded-xl"
                    >
                        <font-awesome icon="chevron-left" />
                    </button>
                    <div class="flex-1 min-h-0 ">
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
                    <button
                        v-if="current !== total"
                        type="button"
                        @click="current = Math.min(total, current + 1); $event.currentTarget.blur()"
                        class=" hover:bg-gray-300 px-2 my-20 text-2xl rounded-xl "
                    >
                        <font-awesome icon="chevron-right" />
                    </button>
                    <button
                        v-else
                        type="button"
                        @click.prevent.stop="finishLesson(); $event.currentTarget.blur()"
                        class="self-center h-10 w-10 my-20 hover:bg-gray-200 rounded-full"
                    >
                        <font-awesome icon="fa-check" class="text-green-500"/>
                    </button>
                   
                </div>
                <FooterReader 
                    @pointerdown.stop
                    @pointermove.stop
                    @pointerup.stop
                    :youtube-data="youtubeData"
                />
            </div>

                <Sidebar
                    @click.stop
                    @pointerdown.stop
                    @pointermove.stop
                    @pointerup.stop
                    v-model:sidebar-data="currentPhraseData"
                    :valid-phrase="validCurrentPhrase"
                    
                />
                <!-- @update-previous="handleUpdatePrevisous" -->

        </div>
    
        <div v-else class="px-5 py-20 w-1/2  self-center ">
            <LoadingProgressBar />        
        </div>
    </div>
</template>

<script setup>

import { ref, computed, onMounted, nextTick, onBeforeUnmount, watch } from 'vue'

// import HeaderLing from '~/components/reading/HeaderLing.vue';
import HeaderFindingJob from '~/components/reading/HeaderFindingJob.vue';
import FooterReader from '~/components/reading/FooterReader.vue';
import HeaderReader from '~/components/reading/HeaderReader.vue';
import Sidebar from '~/components/reading/middle/Sidebar.vue';
import Reader from '~/components/reading/middle/Reader.vue';
import LoadingProgressBar from '~/components/LoadingProgressBar.vue';


const mainRef = ref(null)
const boxHeight = ref(0)
const loading = ref(true)


const current = ref(1)
const total = ref(1)

const messure = () => {
    const rect = mainRef.value?.getBoundingClientRect?.()
    boxHeight.value = Math.round(rect?.height ?? 0)

}


const lessondata = ref( [])
const listSentence = ref([])
const core_data = ref([])
const statusTagsMeanings = ref({})
const youtubeData = ref({})

const route = useRoute()

watch(
  () => [route.query.lessonName, route.query.courseName],
  async ([newLesson, newCourse], [oldLesson, oldCourse]) => {
    if (newLesson === oldLesson && newCourse === oldCourse) return
    current.value = 1
    total.value = 1
    await getLesson()
    await nextTick()
    messure()
  }
)
const lesson_name = computed(() => route.query.lessonName ?? 'How to Evaluate Your Own Level of English - Watch this to Find Out (A1-C2)')
const course_name = computed(() => route.query.courseName ?? 'default')
const getLesson = async () => {
    loading.value = true
    try {
        await $fetch(`/api/login/`, {
            method: "POST",
            body: {
                email: 'Good@luck.com',
                password: 1
            },
            credentials: "include"
        })
    
    
        const data = await $fetch(`/api/get_lesson/`, {
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
    youtubeData.value = data.youtube_data?? [] 
    
}

    catch (error) {
        console.error(error)
    }
    loading.value = false

}

const validCurrentPhrase = ref(true)

const currentPhraseData = ref({
    phrase: 'breakfast',
    tags: ["demo"],
    your_meanings: [],
    global_tags : [],
    global_meanings: [],
    status: validCurrentPhrase.value ? 2 : 0,
})



watch(currentPhraseData, (newVal) => {
    const phraseText = typeof newVal?.phrase === 'string' ? newVal.phrase : ''
    if (!phraseText) return
  
    if (phraseText.split(" ").length > 1 && newVal.status === 6) return

    if (phraseText.split(" ").length > 1 && newVal.status === 0 ) { delete statusTagsMeanings.value[phraseText]}
    statusTagsMeanings.value[phraseText] = {
        "tags": newVal.tags,
        "your_meanings": newVal.your_meanings,
        "global_tags": newVal.global_tags,
        "global_meanings": newVal.global_meanings,
        "status": newVal.status,
    }

}, {deep: true})


const onSelected = (data) => {

    validCurrentPhrase.value  = data.valid
    currentPhraseData.value = {
        phrase : data.text,
        tags : statusTagsMeanings.value[data.text]?.tags?? [],
        your_meanings : statusTagsMeanings.value[data.text]?.your_meanings?? [],
        global_tags : statusTagsMeanings.value[data.text]?.global_tags?? [],
        global_meanings : statusTagsMeanings.value[data.text]?.global_meanings?? [],
        status : validCurrentPhrase.value ?  statusTagsMeanings.value[data.text]?.status?? 6 : 0,
    }

} 


const router = useRouter()
const {getCsrfToken} = useCsrf()
const finishLesson = async () => {
    loading.value = true
    
    const statusDict = {}
    const listKeys = Object.keys(statusTagsMeanings.value)
    for (const item of listKeys) {
        statusDict[item] = statusTagsMeanings.value[item].status
    }
  

   try {
        await $fetch(`/api/finish_lesson/`, {
            method: "PUT", 
            body: statusDict,
            credentials: "include",
                headers: {
                    "X-CSRFToken": getCsrfToken(),
                }
        })

        router.push({
            path: '/ReviewVocabs',
            query: {        
                courseName: course_name.value,
                lessonName: lesson_name.value
            }
        })
   }

   catch(error) {
        console.log("there is an error with finish lesson", error)
   }
}


onMounted(async () => {
    await getLesson()
    await nextTick();
    messure();
   
    window.addEventListener('resize', messure)

})

onBeforeUnmount(() => {
    window.removeEventListener('resize', messure)
})


</script>


<!-- |  1 | test@example.com | test@example.com |        0 |            0 | 2026-04-12 09:30:14.021019 |
|  2 | good@luck.com    | good@luck.com    |        0 |            0 | 2026-04-09 02:49:16.758013 |

<!-- https://www.youtube.com/watch?v=N0gZFvpxNhQ -->
 <!-- How to Evaluate Your Own Level of English - Watch this to Find Out (A1-C2) -->

<!-- https://www.youtube.com/watch?v=fEY_fmLjHNc -->
<!-- How's it Going? | Learn English Phrases | Small Talk -->


