<template>
    <div class="h-screen   flex items-center justify-center">
        <button @click="handleopenPopup" class="bg-green-300 p-3 rounded-lg">{{ openPopup ? 'Close' : 'Open' }}</button>

        <div class="fixed  inset-0 z-10 pointer-events-none">
            <div class="absolute -translate-y-full pointer-events-auto" v-if="openPopup"
                :style="{ left: popupCoordinate.x + 'px', top: popupCoordinate.y + 'px' }">
                <Popup />
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'

import Popup from './Popup.vue';

const openPopup = ref(false)
const popupCoordinate = ref({x: 0, y: 0})

const handleopenPopup = (e) => {
    openPopup.value = !openPopup.value
    const el = e.target
    const r = el.getBoundingClientRect()

    popupCoordinate.value = {x: r.left, y:r.top}
    console.log("openPopup", openPopup.value) 
    console.log('r.left', r.left)
    console.log('r.bottom', r.bottom)
}

</script>