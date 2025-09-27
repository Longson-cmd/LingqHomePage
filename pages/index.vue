<!-- <template>
  <practise></practise>
</template> -->



<template>
  <div class="max-w-sm mx-auto border shadow mt-20 p-4 rounded-xl">

    <h2 class="text-2xl text-center font-bold py-4">
        Welcome Back
    </h2>
    <form @submit.prevent="handlesubmit" class="flex flex-col space-y-4 w-full justify-center py-4">
      <input type="email" placeholder="Email" v-model="Email"
      class="border w-full p-2 rounded">
      <input type="password" placeholder="Password" v-model="Password"
      class="border w-full p-2 rounded">
      <button :disabled="Loading" type="submit" class="bg-black text-white  p-2 rounded">{{Loading? 'Loading ...': 'Log in'}}</button>
      <p v-if="messageErr" class="text-sm text-red-400">{{messageErr}}</p>
    </form> 
    
    <p class="text-center w-full text-sm">Don't have a account?
      <NuxtLink to="/SignUp" class="text-blue-600 ">Sign Up</NuxtLink>
    </p>

  </div>

</template>

<script setup>
import {ref} from 'vue'

import { useRouter } from 'vue-router';
const Email = ref("")
const Password = ref("")
const Loading = ref(false)
const router = useRouter()

const messageErr = ref("")

const handlesubmit = async () => {
  if (Loading.value)  return
  Loading.value = true
  messageErr.value = ''
  try {
    // await $fetch("http://localhost:8000/login/", {
    //   method: "POST",
    //   body: {
    //     email: Email.value,
    //     password: Password.value
    //   }, 
    //   credentials: "include"
    // })

    alert("Login successfully")
    router.push("/HomePage")
  }
  catch (error) {
    console.log("there is an error", error)
    messageErr.value = error?.data?.message || error?.message || "failed to login"
  }
  finally {
    Loading.value = false;
  }

}

</script>