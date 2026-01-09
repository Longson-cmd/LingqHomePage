<template>

    <div class="border flex  flex-col rounded-3xl w-[390px] h-[calc(100vh-104px)] mt-3  pt-3 ">
        <!-- word and tags -->
        <div class="px-5 pb-2 ">
            <div class="flex flex-row gap-2 items-center font-bold text-xl my-3">
                <img src="/icons/reader/volume.svg" alt="volume" class="" />
                <span>{{ sidebarData.phrase }}</span>
            </div>
            <div class="flex ">
                <div class="flex self-start items-center  shrink-0  w-10">
                    <img src="/icons/reader/coins.svg" alt="coin" class=" h-4 w-4">
                    <span class="mx-1">{{ frequent }}</span>
                </div>

                <div ref="inputTag" class="relative flex border-l border-gray-400 px-2 gap-1 items-center flex-wrap text-xs">
                    <div v-for="tag in listTags" :key="tag"
                        :class="listGlobalTags.includes(tag) && 'bg-gray-200'"
                        class="relative   px-1 border border-gray-400 text-center bg-gray-100 rounded  h-[18px] group">
                        <span>{{ tag }}</span>
                        <button v-if='!listGlobalTags.includes(tag)' @click="clearTag(tag)"
                            class="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-400 flex items-center justify-center hidden group-hover:flex"><font-awesome
                                icon="times" class="h-2 w-2" /></button>
                    </div>

                    <button v-if="!openAddtag" @click.stop ="openAddtag = true"
                        class="border  border-gray-400 px-1 rounded hover:bg-gray-300 whitespace-nowrap flex items-center gap-0.5">
                        Tag <font-awesome icon="plus" class="h-2 w-2" />
                    </button>
                    <input v-else  type="text"  @keydown.enter.stop @keyup.enter="addTag" v-model="newTag"
                        class="absolute -bottom-6 w-52 bg-white z-10 focus:outline-none focus:ring-0 px-2 p-0.5 rounded-md border border-gray-300 ">
                </div>
            </div>
        </div>

        <div class="p-5 border-y border-y-gray-300 flex flex-col gap-1 flex-1 min-h-0 overflow-auto custom-scrollbar">
            <span class="font-medium">Saved Meaning</span>
            <div v-for="(meaning, i) in listMeanings" :key="i" class="relative group mt-2">
                <textarea placeholder="Enter meaning" v-model="listMeanings[i]" @input="(e) => {
                    e.target.style.height = 'auto'
                    e.target.style.height = e.target.scrollHeight + 'px'
                }" @keydown.enter.prevent="($event.target.blur())"
                    class=" inline-block w-full leading-none text-start pt-2 px-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-0 " />
                <div class="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 hidden group-hover:flex">
                    <button @click="removeMeaning(meaning)"
                        class=" h-5 w-5 rounded-full bg-white flex items-center justify-center"><font-awesome
                            icon="times" class="h-3" /></button>
                    <button @click="openAddMeaning = true"
                        class=" h-5 w-5 rounded-full bg-white flex items-center justify-center"><font-awesome
                            icon="plus" class="h-3" /></button>
                </div>
            </div>

            <textarea v-show="openAddMeaning" placeholder="Enter new meaning, then press 'Enter'" v-model="newMeaning"
                @input="(e) => {
                    e.target.style.height = 'auto',
                        e.target.style.height = e.target.scrollHeight + 'px'

                }" @keydown.enter.prevent="addMeaning"
                class="border min-h-10 inline-block w-full leading-none text-start pt-2 px-2  rounded-lg focus:outline-none focus:ring-0 " />

            <span class="inline-block mt-5 mb-1 font-medium">Dictionaries</span>
            <button class="px-3 py-1 self-start bg-gray-100 hover:bg-gray-300 inline-block text-xs rounded">Google
                Translate</button>

            <div class="mt-5 mb-1 flex justify-between items-center">
                <span class="block  text-center font-medium">Popular Meanings</span>
                <button class="hover:bg-gray-100 flex items-center gap-1 px-3 rounded-md">Report <img
                        src="/icons/reader/report.svg" alt="report" class="inline-block" /></button>
            </div>

            <button v-for="(traslattion, i) in usersTranslation" :key="i" @click="selectTranslations(i)"
                class=" text-blue-600 px-3 py-2 mt-1 bg-gray-100 hover:bg-gray-200 flex items-center justify-between rounded-md"
                :class="i === focusTranslationIndex && 'bg-gray-200'"
                >
                <span>{{ traslattion }}</span>
                <div class="flex  gap-1 justify-end ">
                    <img v-if="i === 0" src="/icons/reader/chatgpt.svg" class="inline-block h-5" alt="chatgpt">
                    <font-awesome icon="plus" class="h-4" />
                </div>
            </button>
        </div>

        <div class="px-4 py-2 flex justify-between">
            <button @click="currentPhraseData.status = 0 ;console.log('currentPhraseData.value.status' , currentPhraseData.value.status)"
                :class="['h-10 w-10 rounded-full border border-gray-300 hover:bg-red-100 flex items-center justify-center', wordStatus === 0 && 'bg-red-100']"><img
                    src="/icons/reader/trash.svg" alt="" /></button>
            <button @click="currentPhraseData.status = 1"
                :class="['h-10 w-10 rounded-full border border-gray-300 hover:bg-yellow-300 flex items-center justify-center', wordStatus === 1 && 'bg-yellow-300', wordStatus === 6 && 'bg-blue-200']">1</button>
            <button @click="currentPhraseData.status = 2"
                :class="['h-10 w-10 rounded-full border border-gray-300 hover:bg-yellow-200 flex items-center justify-center', wordStatus === 2 && 'bg-yellow-200']">2</button>
            <button @click="currentPhraseData.status = 3"
                :class="['h-10 w-10 rounded-full border border-gray-300 hover:bg-yellow-100 flex items-center justify-center', wordStatus === 3 && 'bg-yellow-100']">3</button>
            <button @click="currentPhraseData.status = 4"
                :class="['h-10 w-10 rounded-full border border-gray-300 hover:bg-gray-200 flex items-center justify-center', wordStatus === 4 && 'bg-gray-200']">4</button>
            <button @click="currentPhraseData.status = 5"
                :class="['h-10 w-10 rounded-full border border-green-200 hover:bg-green-100 flex items-center justify-center', wordStatus === 5 && 'bg-green-200']"><font-awesome
                    icon="check" class="text-green-500" /></button>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'


const props = defineProps({
    sidebarData: {type : Object, default: () => ({
            phrase: 'breakfast',
             tags: [
                "demo"
            ],
            your_meanings: [
                "bữa sáng"
            ],
            global_tags: [
                "v",
                "n",
                "s", 
                'r'
            ],
            global_meanings: [
                "bữa",
                "sáng",
                "ăn",
                "điểm tâm"
            ],
            status: 1
            })}
})

const emit = defineEmits(['update:sidebarData'])


const currentPhraseData = ref({
            phrase: 'breakfast',
             tags: [
                "demo"
            ],
            your_meanings: [
                "bữa sáng"
            ],
            global_tags: [
                "v",
                "n",
                "s", 
                'r'
            ],
            global_meanings: [
                "bữa",
                "sáng",
                "ăn",
                "điểm tâm"
            ],
            status: 1
            })


const wordStatus = computed(() => currentPhraseData.value.status)
const frequent = 1
const POS_MAP = {
  n: 'noun',
  v: 'verb',
  a: 'adjective',
  s: 'adjective', // adjective satellite
  r: 'adverb'
}

const inputTag = ref(null)
const listGlobalTags = computed(() => currentPhraseData.value.global_tags.map(p => POS_MAP[p]))
const listTags = computed(() =>[
    ...listGlobalTags.value,
    ...currentPhraseData.value.tags?? []
])
const newTag = ref('')
const openAddtag = ref(false)


const openAddMeaning = ref(false)
const listMeanings = computed(() => currentPhraseData.value.your_meanings)
const newMeaning = ref('')

const usersTranslation = computed(() => currentPhraseData.value.global_meanings)
const focusTranslationIndex = ref(0)

const clearTag = (tag) => {
    console.log( currentPhraseData.value.tags)
    // if (listGlobalTags.value.includes(tag)) return
  
    console.log('tag', tag)
  
    currentPhraseData.value.tags = currentPhraseData.value.tags.filter(item => item !== tag)
}

const addTag = () => {
    
    const textNewTag = newTag.value.trim()
    if (!textNewTag) {
    //  console.log(currentPhraseData.value.tags)
        openAddtag.value = false
        return
    }

    console.log(currentPhraseData.value.tags)
    if (currentPhraseData.value.tags.includes(textNewTag)) {

        return
    }

    currentPhraseData.value.tags.push(textNewTag)
    newTag.value = ''
    openAddtag.value = false

}

const removeMeaning = (meaning) => {
    const arr = currentPhraseData.value.your_meanings
    currentPhraseData.value.your_meanings = arr.filter(w => w !== meaning)
}

const addMeaning = () => {
    const textNewMeaning = newMeaning.value.trim()
    if (!textNewMeaning) return

    if (!currentPhraseData.value.your_meanings.includes(textNewMeaning)) {
        currentPhraseData.value.your_meanings.push(textNewMeaning)
    }
    newMeaning.value = ''
    openAddMeaning.value = false
}

const selectTranslations = (idx) => {
    if (!currentPhraseData.value.your_meanings.includes(currentPhraseData.value.global_meanings[idx])) {
        currentPhraseData.value.your_meanings.unshift(currentPhraseData.value.global_meanings[idx])
    }
    
    currentPhraseData.value.global_meanings.splice(idx, 1)
}

const onKeydown = (e) => {
    const listkeys = ['ArrowDown', 'ArrowUp', 'Enter']
    if (!listkeys.includes(e.key)) return

    const tag = e.target?.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA') return
    e.preventDefault()
    if (e.key === 'Enter') {
        if (currentPhraseData.value.global_meanings.length < 1) return
        selectTranslations(focusTranslationIndex.value)
        return
    }

    const findNewIndex = (idx) => {
        if (idx < 0) {
            return currentPhraseData.value.global_meanings.length - 1
        }
        else if (idx === currentPhraseData.value.global_meanings.length) {
            return  0
        }
        else {return idx}

    }
    

    if (e.key === 'ArrowDown') {
        focusTranslationIndex.value = findNewIndex(focusTranslationIndex.value + 1)
    }


    if (e.key === 'ArrowUp') {
        focusTranslationIndex.value = findNewIndex(focusTranslationIndex.value - 1)
    }

    console.log('focusTranslationIndex ', focusTranslationIndex.value)
 
}

const handleClickOutside = (e) => {
    if (inputTag.value && !inputTag.value.contains(e.target)) {
        addTag()
       
    }
}       

onMounted(() => {
    window.addEventListener('keydown', onKeydown),
    window.addEventListener('click', handleClickOutside)
})


onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown);
    window.removeEventListener("click", handleClickOutside)
})
</script>


<style scoped>
/* Custom dark scrollbar */
.custom-scrollbar {
    scrollbar-width: thin;
    /* Firefox */
    scrollbar-color: #0A0F17 #ffffff00;
    /* thumb color | track color */
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    /* scrollbar width */
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    /* no track */
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #0A0F17;
    /* the dark bar you want */
    border-radius: 999px;
}
</style>