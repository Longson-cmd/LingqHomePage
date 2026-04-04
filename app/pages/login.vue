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
        <NuxtLink to="/signup" class="text-blue-500 hover:underline">Sign Up</NuxtLink>
      </span>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
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
    router.push("/HomepageLingQ");
  } catch (error) {
    console.error("There is an error:", error);
    errMessage.value =
      error?.data?.message  || "Failed to login";
  } finally {
    isLoading.value = false;
  }
};




</script>



<!-- # auth path
path("register/", register_user, name = 'signup'),
path("login/", login_user, name = 'login'),

# couser path
path('create_course/', create_course, name = 'create_course'),
path('delete_course/', delete_course, name = 'delete_course'),
# Send data to hompage
path('continue_study/', get_data_cards, name='get_data_cards'),
path('show_course_infos/', show_course_infos, name='show_course_infos'),
path('get_list_courses/', get_list_courses, name='get_list_courses'),

# lesson path
path("create_youtube_lesson/", create_youtube_lesson, name = "create_youtube_lesson"),
path("create_lesson_manually/", create_lesson_manually, name = 'create_lesson_manually'),
path("get_lesson/" , get_lesson, name= "get_lesson"),
path('delete_lesson/', delete_lesson, name='delete_lesson'),

#upload text and audio path
path("upload_text/", upload_text, name = "upload_text"),
path("upload_audio/", upload_audio, name="upload_audio"),

# word path
path("update_word/", update_word, name= "update_word" ),
path("finish_lesson/",  finish_lesson, name= "finshi_lesson" ), -->



