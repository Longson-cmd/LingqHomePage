<!-- 
<template>
    <practise/>
</template> -->

<template>
  <div class="h-screen flex items-center justify-center px-5">
    <div class="w-full max-w-[400px] border rounded-xl p-5 flex flex-col gap-3 shadow">
      <h2 class="text-center text-2xl font-bold pb-5">Welcome back</h2>

      <form class="flex flex-col gap-3" @submit.prevent="handleSubmit">
        <input
          type="email"
          class="border w-full p-2 rounded-md"
          placeholder="Email"
          v-model="email"
          required
        />
        <input
          type="password"
          class="border w-full p-2 rounded-md"
          placeholder="Password"
          v-model="password"
          required
        />

        <button
          :disabled="isLoading"
          type="submit"
          class="w-full bg-black text-white rounded-md p-2 hover:bg-gray-800 transition disabled:opacity-50"
        >
          {{ isLoading ? "Loading..." : "Log in" }}
        </button>

        <p v-if="errMessage" class="text-center text-sm text-red-600">
          {{ errMessage }}
        </p>
      </form>

      <span class="text-center text-sm">
        Don't have an account?
        <NuxtLink to="/Signup" class="text-blue-500 hover:underline">Sign Up</NuxtLink>
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref("");
const password = ref("");
const errMessage = ref("");
const isLoading = ref(false);

const handleSubmit = async () => {
  isLoading.value = true;
  errMessage.value = "";

  try {
    await $fetch(`${config.public.apiBase}/login/`, {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
      credentials: "include",
    });

    alert("Login successfully!");
    await navigateTo('/HomepageLingQ')
  } catch (error) {
    console.error("There is an error:", error);
    errMessage.value =
      error?.data?.message  || "Failed to login";
  } finally {
    isLoading.value = false;
  }
};
</script>

<!-- ssh -i "C:\Users\PC\.ssh\lingq-key.pem" ec2-user@3.26.146.123 -->

<!-- PORT=3000 HOST=0.0.0.0 node .output/server/index.mjs -->


<!-- export PORT=3000 -->
<!-- export HOST=0.0.0.0 -->

<!-- nohup env PORT=3000 HOST=0.0.0.0 node .output/server/index.mjs > frontend.log 2>&1 &; exit -->

<!-- ss -ltnp | grep 3000 -->
<!-- kill 148353 -->
<!-- LingqHomePage -->
<!-- email = 'test@example.com',
password = "1234abcd" -->