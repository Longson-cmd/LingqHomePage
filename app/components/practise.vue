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
                        <Reader  :readerHeight="boxHeight" v-model:current-value="current" @send-total-page="total = $event"/>
                    </div>
                    <button @click="current = Math.min(total, current + 1)" :class="(current === total) && 'transparent text-transparent pointer-events-none'" class=" hover:bg-gray-300 px-2 my-20 text-2xl rounded-xl">
                        <font-awesome icon="chevron-right" />
                    </button>
                </div>
                <FooterReader />
            </div>

            <Sidebar />

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue'
import HeaderLing from './reading/HeaderLing.vue';
import FooterReader from './reading/FooterReader.vue';
import HeaderReader from './reading/HeaderReader.vue';
import Sidebar from './reading/middle/Sidebar.vue';
import Reader from './reading/middle/Reader.vue';


const mainRef = ref(null)
const boxHeight = ref(0)

const selected = ref('')
const current = ref(1)
const total = ref(1)

const messure = () => {
    boxHeight.value = Math.round(mainRef?.value.getBoundingClientRect().height)
}

onMounted(async () => {
    messure();
    await nextTick();
   
    window.addEventListener('resize', messure)

})

onBeforeUnmount(() => {
    window.removeEventListener('resize', messure)
})


</script>