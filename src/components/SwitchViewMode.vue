<template lang="pug">
div(class="inline-flex gap-x-1")
  div(class="w-[22px] h-[22px] relative")
    input(type="radio" name="view-mode" id="view-mode-card" class="hidden peer" value="card" @change="$emit('switchViewMode', $event.target.value)" :checked="viewMode === 'card'")
    label(for="view-mode-card" class="w-[22px] h-[22px] absolute top-0 left-0 bg-neutral-300 cursor-pointer peer-checked:bg-pink-300") 
  div(class="w-[22px] h-[22px] relative")
    input(type="radio" name="view-mode" id="view-mode-list" class="hidden peer" value="list" @change="$emit('switchViewMode', $event.target.value)" :checked="viewMode === 'list'")  
    label(for="view-mode-list" class="w-[22px] h-[22px] absolute top-0 left-0 bg-neutral-300 cursor-pointer peer-checked:bg-pink-300") 

</template>

<script setup>
defineProps({viewMode: String})
defineEmits(['switchViewMode'])
</script>
