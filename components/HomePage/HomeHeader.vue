<template>
  <header class="bg-white shadow">
    <nav class="w-full h-16 flex items-center justify-between">
      <button @click="toggleMenu" class=" pl-5 md:hidden">
        <FontAwesomeIcon :icon="isOpen ? 'fa-times': 'fa-bars'"></FontAwesomeIcon>
      </button>

      <div class="hidden md:flex">
        <img
        src="/images/BuddhistSymbol.png"
        alt="Icon"
        class="h-16 w-16 rounded-full p-3"
        />
        <NuxtLink class="hover:bg-gray-200 h-16 flex items-center p-2">
          Lessons
        </NuxtLink >
        <NuxtLink class="hover:bg-gray-200 h-16 flex items-center p-2">
          Tutors
        </NuxtLink>
        <NuxtLink class="hover:bg-gray-200 h-16 flex items-center p-2">
          Community
        </NuxtLink>
      </div>


      <div class="flex space-x-3 items-center justify-center p-2">
 
        <NuxtLink
        to="/en/acount"
        title="Get Premium"
        class="flex items-center h-10 gap-2 bg-yellow-400 hover:bg-yellow-500
        text-white font-medium uppercase px-4 py-2 rounded-lg shadow
        "
        >
          <span>
            <FontAwesomeIcon icon="fa-solid fa-crown" class="w-5 h-5"></FontAwesomeIcon>
          </span>
            <span class="hidden md:inline text-sm">Get Premium</span>
            <span class="md:hidden text-sm">Premium</span>
          
        </NuxtLink>
     
        <div class='hidden md:flex md:space-x-2 md:items-center'>
          <div class="relative inline-block space-y-4">
            <button @click="toggleLang" class="flex items-center justify-center rounded-full pr-3 gap-1 bg-gray-100 hover:bg-gray-200">
              <img
              src="/images/China.png"
              alt="China"
              class="w-10 h-10 rounded-full"
              
              />
              28
              <FontAwesomeIcon icon="fa-solid fa-chevron-down"/>
            </button>

            <div :class="['absolute space-y-3 right-0 p-3 w-64 border shadow rounded-xl z-50 bg-white', isOpenlang ? 'block' : 'hidden']">
              <ul class="space-y-2 border-b border-gray-300 pb-3">
                <li class="flex items-center justify-between hover:bg-gray-100 p-2 rounded-xl">
                  <div  class="flex gap-2">
                    <img src="/images/France.png" class="h-5 w-5 rounded-full"/>
                     French
                  </div>
                  
                  (0)
                </li>

                <li class="flex items-center justify-between hover:bg-gray-100 p-2 rounded-xl">
                  <div class="flex gap-2">
                    <img src="/images/England.png" class="h-5 w-5 rounded-full"/>
                    English
                  </div>
                  
                  (0)
                </li>
              </ul>

              <div class="flex items-center gap-5 px-2 rounded text-gray-600 cursor-pointer hover:bg-gray-200 ">
                <FontAwesomeIcon icon="fa-solid fa-plus" class="text-xl" />
                <div class="font-bold">Add a new language</div>
              </div>

              
            </div>

          </div>
  
          <div class="relative inline-block space-y-4">
            <button class="h-10 flex items-center gap-2 bg-gray-100
                hover:bg-gray-200 rounded-full pr-3 py-1
                " @click="toggleProfile">
              <div class="relative w-10 h-10 rounded-full bg-green-300
              flex items-center justify-center text-white font-bold
              ">
                N 
                <div class="absolute -top-1 -right-1 bg-red-600
                text-white text-xs font-bold rounded-full px-0.5
                ">
                  89
                </div>
              </div>

                <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
            </button>

            <div :class="['absolute w-[180px] space-y-3 right-0 p-3 border shadow rounded-xl z-50 bg-white', isOpenProfile ? 'block' :'hidden']">
              <ul class="space-y-4">
                <li class="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
                  <FontAwesomeIcon icon="fa-solid fa-gear"/>
                  <span>Settings</span>
                </li>
                <li class="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
                  <FontAwesomeIcon icon="fa-solid fa-user"/>
                  <span>Profile</span>
                </li>
                <li class="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
                  <FontAwesomeIcon icon="fa-solid fa-envelope"/>
                  <span>Contact</span>
                </li>
                <li class="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
                  <FontAwesomeIcon icon="fa-solid fa-user-plus"/>
                  <span>Invite Friends</span>
                </li>
                <li class="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
                  <FontAwesomeIcon icon="fa-solid fa-file-lines"/>
                  <span>Grammar Guide</span>
                </li>
                <li class="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
                  <FontAwesomeIcon icon="fa-solid fa-question-circle"/>
                  <span>Help</span>
                </li>
                <li class="flex items-center gap-3 hover:bg-gray-100 p-2 rounded">
                  <FontAwesomeIcon icon="fa-solid fa-right-from-bracket"/>
                  <span>Log out</span>
                </li>
              </ul>
            </div>
          </div>

        </div>


      </div>
    </nav>
  </header>
</template>


<script setup>

import {ref} from "vue"

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const isOpenlang = ref(false)
const isOpenProfile = ref(false)
const toggleLang = () => {
    isOpenlang.value = !isOpenlang.value
    console.log(isOpenlang.value)
    if (isOpenProfile.value = true) {
      isOpenProfile.value = false
    }
}


const toggleProfile = () => {
  isOpenProfile.value = !isOpenProfile.value
  if (isOpenlang.value = true) {
    isOpenlang.value = false
  }
}

</script>