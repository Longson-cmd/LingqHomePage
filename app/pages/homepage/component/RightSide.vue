<template>
  <div class=" flex gap-2  ">
    <!-- Choosing languages button -->
    <button @click="handletoggle('languages')" class="relative ">
      <div class="h-10 rounded-full flex items-center justify-center font-bold bg-gray-200 gap-0.5">
        <img src="/images/England.png" alt="England flag" class="h-10 w-10 rounded-full">
        <span>2000</span>
        <font-awesome icon="chevron-down"/>
      </div>

      <div v-if="openLanguages" class="absolute bg-white border rounded-2xl mt-3 w-72  right-0 text-sm px-2 py-1 flex flex-col gap-1 font-medium">
        <NuxtLink to="/chinese" class="flex justify-between hover:bg-gray-200 py-2 px-1 rounded-lg">
          <div class="inline-flex gap-2">
            <img src="/images/China.png" alt="China flag" class="h-5 w-5 rounded-full"/>
            <span>Chinese</span>
          </div>
          <span >(7340)</span>
        </NuxtLink>
        <NuxtLink to="/chinese" class="flex justify-between hover:bg-gray-200 py-2 px-1 rounded-lg">
          <div class="inline-flex gap-2">
            <img src="/images/France.png" alt="French flag" class="h-5 w-5 rounded-full"/>
            <span>France</span>
          </div>
          <span >(4000)</span>
        </NuxtLink>

        <div class="h-0.5 w-full bg-gray-200"></div>

        <button class="py-3 w-full flex justify-start items-center ">
          <div class="w-full flex hover:bg-gray-200 py-2 px-1 rounded-lg ">
            <font-awesome icon="plus" class="ml-3"/>
            <span class="ml-12">Add a new language</span>
          </div>
        </button>
      </div>
    </button>

    <!-- profile and settings button -->
    <button @click="handletoggle('settings')" class="relative">
      <div class="h-10 w-16 bg-gray-200 flex rounded-full flex items-center gap-1">
        <div class="h-10 w-10 rounded-full relative">
          <img src="/images/avatar.jpg" alt="avatar" class="h-10 w-10 rounded-full">
          <div class="absolute bg-red-600 h-4 w-4 rounded-full -top-0.5 right-0 flex items-center justify-center text-xs text-white">90</div>
        </div>
        <font-awesome icon="chevron-down"/>
      </div>
      <!-- drop down of settings part -->
      <div v-if="openSetting" class="absolute bg-white border rounded-2xl mt-3 w-48  right-0 text-sm px-2 py-3 flex flex-col gap-2 font-medium">

        <button class="flex w-full px-2 py-4 rounded-lg h-5 hover:bg-gray-200 items-center justify-between">
          <span class="inline-flex gap-2 items-center">
            <img src="/icons/header/notifications.svg" alt="notificaitons" class="h-4"/>
            <span>Notificaitons</span>
          </span>
          <span>90</span>
        </button>

        <NuxtLink to="/settings" class="flex w-full px-2 py-4 rounded-lg justify-start h-5 items-center gap-2 hover:bg-gray-200">
           <img src="/icons/header/settings.svg" alt="settings" class="h-4"/>
           <span>Settings</span>
        </NuxtLink>

        <NuxtLink to="/settings" class="flex w-full px-2 py-4 rounded-lg justify-start h-5 items-center gap-2 hover:bg-gray-200">
           <img src="/icons/header/logout.svg" alt="notificaitons" class="h-4"/>
           <span>Log out</span>
        </NuxtLink>
      </div>
    </button>

  </div>
</template>

<script setup>
import {ref} from "vue"

const openSetting = ref(false)
const openLanguages = ref(false)

const handletoggle = (toggle_kind) => {
  if (toggle_kind === 'settings') {
    openLanguages.value = false
    openSetting.value = !openSetting.value
    console.log("openSetting ", openSetting.value)
  }

  if (toggle_kind === "languages") {
    openSetting.value = false
    openLanguages.value = !openLanguages.value
    console.log("languages ", openLanguages.value)
  }
}
</script>
