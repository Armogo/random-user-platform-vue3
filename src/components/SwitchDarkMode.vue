<template lang="pug">
button(class="relative inline-flex flex-shrink-0 h-[25px] w-[50px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
:class="[darkMode ? 'bg-teal-700 bg-no-repeat bg-[length:45%] bg-[url(/moon.png)] bg-[5%_center]' : 'bg-neutral-500 bg-no-repeat bg-[length:45%] bg-[url(/sun.png)] bg-[95%_center]']" @click="$emit('switchDarkMode')")
  span.sr-only Use setting
  span(aria-hidden="true" class="pointer-events-none inline-block h-full w-2/4 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200" :class = "darkMode ? 'translate-x-full' : 'translate-x-0'")
</template>

<script setup>
defineProps({ darkMode: Boolean });
defineEmits(['switchDarkMode'])
</script>
