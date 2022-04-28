<template lang="pug">
main(class="overflow-y-scroll flex flex-wrap justify-center gap-x-2" :class="darkMode ? 'scrollbar-dark' : 'scrollbar'")
  div(class="mb-2 border border-solid border-slate-300 rounded shadow-lg break-words flex-initial basis-[90%] max-w-[13rem] cursor-pointer sm:basis-52" v-for="(user, index) in props.data" :key="index" @click="showModal(user)")
    img(class="mx-auto mt-3 w-3/5 border border-slate-300 border-solid" :src="user.picture.large" :class="{'brightness-90':darkMode}" alt="user's avatar")
    div(class="px-3 pt-1 pb-2 text-center")
      p(class="font-bold") {{user.name.last}} {{user.name.first }}
      div(class="text-sm")
        p Age: {{user.dob.age}}
        p Gender: {{user.gender}}
        p Location: {{user.location.country}}    
  TheModal(v-show="modal" :modal-data="modalData" :dark-mode="darkMode" @close-modal="showModal")   
</template>

<script setup>
import TheModal from "./TheModal.vue";
import { ref } from "vue";

const props = defineProps({
  data: Array,
  darkMode: Boolean,
});
const modal = ref(false);
const modalData = ref(null);

// modal control
function showModal(user) {
  modal.value = !modal.value;

  if (modal.value) {
    modalData.value = user;
  } else {
    modalData.value = null;
  }
}
</script>
