<template>

    <div class="relative border border-gray-400 flex w-[320px] h-[174px] 
    bg-white shadow-2xl rounded-3xl flex-col">
        <font-awesome-icon icon='fa-check' class=" absolute top-5 right-10 h-6 w-6 text-green-400" />
        <!-- upper part -->
        <button class="p-1 border rounded-full absolute top-2 right-2 h-5 w-5 flex items-center">
        <font-awesome-icon icon='fa-times'  />
        </button>
        <!-- upper part -->
        <div class="relative border-b border-b-gray-300 w-full px-4 pt-4 space-y-3 pb-4">
            <div class="flex items-center gap-3">
                <font-awesome-icon icon='fa-volume-high' class="h-6 w-6 text-gray-700" />
                <span class="font-bold text-xl">{{newWord}}</span>
            </div>

            <div class="flex items-start">
                <span class="inline-flex items-center gap-1 w-10 border-r border-r-gray-800 mr-2">
                    <img src="/images/game-coin.png" alt="coin" class="h-5 w-5"></img>
                    4
                </span>
                <!-- <span class=" inline-block w-[2px] self-stretch bg-black mx-2 " ></span> -->
                <div class="flex-1  ">
                <div class="flex flex-wrap gap-2">
                    <div v-for="tag in tags" :key =tag class="bg-gray-300 rounded-md text-xs">{{tag}}</div>
                    <div
                    v-if="!isEditing"
                    @click="startEdit"
                    class="flex items-center mx-2 hover:bg-gray-300 px-1 rounded">
                    <span class="text-sm">Tag+</span>
                    </div>

                    <input
                    v-else
                    ref="inputEl"
                    v-model="draft"
                    type="text"
                    placeholder="Type tag, press Enter"
                    class="absolute -bottom-8 left-20 h-8 w-48 rounded border px-3 text-sm"
                    @keydown.enter.prevent="finishEdit"
                    @blur="finishEdit"
                    />
                </div>
                </div>

            </div>
        </div>

        <!-- lower part -->
        <div class="flex flex-col items-center jutify-center py-2 px-4">
            <input type="text" placeholder="Type a new meaning here" class="w-full border border-gray-300 rounded-lg p-2 ">
            <font-awesome-icon icon="fa-chevron-down"></font-awesome-icon>
        </div>

    </div>

</template>


<script setup>
import { ref, nextTick } from 'vue'

const tags = ref(['Preposition', 'Pronoun'])
const isEditing = ref(false)
const draft = ref('')
const inputEl = ref(null)

function startEdit() {
  isEditing.value = true
  draft.value = ''
  nextTick(() => inputEl.value?.focus())
}

function finishEdit() {
  const t = draft.value.trim()
  if (t && !tags.value.includes(t)) tags.value.push(t)
  isEditing.value = false
  draft.value = ''
}

defineProps({
    newWord: { type: String, required: true }
})
</script>




