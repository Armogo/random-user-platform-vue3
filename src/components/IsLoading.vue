<template lang="pug">
div(v-if="unavailable" class="flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-slate-200") 
  span(class="mt-3 font-semibold text-lg") Sorry, server unavailable.
  span(class="font-semibold text-lg") Please come back later. 😫
div(v-else class="flex flex-col justify-center items-center w-[100vw] h-[100vh] bg-slate-200")  
  svg(class="animate-[spin_1.5s_linear_infinite] h-[60px] w-[60px] fill-transparent" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24")
    circle(class="opacity-35 stroke-cyan-500" cx="50%" cy="50%" r="10" stroke-width="3")
    path(class="opacity-80 fill-slate-100" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z")         
  span(class="mt-3 font-semibold text-lg text-pink-500") Greetings! 😀
  span(class="font-semibold text-lg text-pink-500") Please wait for loading.  
</template>

<script setup>
defineProps({ unavailable: Boolean });
</script>
