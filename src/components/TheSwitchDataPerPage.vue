<template lang="pug">
select(class="border-2 border-neutral-400" :class="[darkMode ? 'bg-slate-800' : 'bg-slate-100']" :value="dataPerPage" @change="switchDataPerPage")
  option(value="10" class="bg-inherit") 10
  option(value="30" class="bg-inherit" selected) 30
  option(value="50" class="bg-inherit") 50  
</template>

<script setup>
defineProps({ darkMode: Boolean, dataPerPage: Number });
const emit = defineEmits(["switchDataPerPage"]);

function switchDataPerPage(event) {
  const number = Number(event.target.value);

  emit("switchDataPerPage", number);
}
</script>
