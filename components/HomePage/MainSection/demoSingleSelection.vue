<template>
  <section>
    <div class="px-16 py-3 space-x-10 text-sm
    text-dark font-medium rounded-md 
    ">
      <button class="rounded-md  py-2 px-4 hover:bg-gray-200 focus-outline-none focus-ring-2" @click="setActive('library')"
      :class="{'bg-gray-200': isActiveLibrary}"
      >Library
    </button>
      <button class="rounded-md  py-2 px-4 hover:bg-gray-200 focus-outline-none focus-ring-2" @click="setActive('playlists')"
      :class="{'bg-gray-200': isActivePlaylists}">Playlists</button>
      <button class="rounded-md  py-2 px-4 hover:bg-gray-200 focus-outline-none focus-ring-2" @click="setActive('vocabulary')"
      :class="{'bg-gray-200': isActiveVocabulary}">Vocabulary</button>
    </div>
  </section>
</template>


<script setup>
const isActiveLibrary = ref(true)
const isActivePlaylists = ref(false)
const isActiveVocabulary = ref(false)


const setActive = (section) => {
  isActiveLibrary.value = section === "library"
  isActivePlaylists.value = section === "playlists"
  isActiveVocabulary.value = section === "vocabulary"
}


</script>