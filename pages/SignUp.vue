<template>

  <div class="max-w-sm mx-auto border shadow mt-20 p-4 rounded-xl">
    <h2 class="text-2xl font-bold text-center py-6">Create your account</h2>
    <form @submit.prevent="handlesubmit" action="" class="space-y-3 pb-2">
      <input type="email" placeholder="Email" v-model="email"
      class="p-2 border w-full rounded "
      >
      <input type="password" placeholder="Password" v-model="password"
      class="p-2 border w-full rounded "
      >
      <button :disabled="Loading" type="submit" class="text-center w-full bg-black hover:bg-gray-700 p-2 text-white rounded">{{Loading? "Loading ..." : "Sign Up"}}</button>
      <p v-if="messageErr" class="text-red-400 text-center">{{messageErr}}</p>
    </form>
    <p class="text-center text-sm">Already have an account?
      <NuxtLink to="/" class="text-sm text-blue-600">Log in</NuxtLink>
    </p>
  </div>

</template> 

<script setup>
import {ref} from 'vue'

const email = ref("")
const password = ref("")
const messageErr = ref("")
const Loading = ref(false)
const router = useRouter()

const handlesubmit = async () => {
  if (Loading.value) return

  Loading.value = true
  messageErr.value = ""

  try {
    // await $fetch("http://localhost:8000/signup/", {
    //   method: "POST",
    //   body: {
    //     email: email.value,
    //     password: password.value
    //   },
      
    // })

    alert("Signed up successfully")
    router.push("/")
  }
  catch (error) {
    console.log("there is an error : ", error)
    messageErr.value = error?.data?.message || error?.message || "failed to singup"
  }
  finally {
    Loading.value = false
  }
}

</script>