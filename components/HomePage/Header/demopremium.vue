<template>
  <div class="flex items-center justify-center p-2">
    <NuxtLink
      to="/en/accounts/subscription/?source=upgradeButton"
      title="Get Premium"
      class="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500
       text-white font-medium uppercase px-4 py-2 rounded shadow"
    >
      <!-- Crown Icon -->
      <span class="w-5 h-5">
        <FontAwesomeIcon icon="fa-solid fa-crown" class="text-white w-5 h-5" />
      </span>

      <!-- Desktop Text -->
      <span class="hidden md:inline text-sm">Get Premium</span>

      <!-- Mobile Text -->
      <span class="md:hidden text-sm">Premium</span>
    </NuxtLink>
  </div>
</template>


