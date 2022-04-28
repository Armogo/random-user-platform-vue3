<template lang="pug">
main(class="overflow-y-scroll scrollbar" :class="darkMode ? 'scrollbar-dark' : 'scrollbar'")
  div(class="w-[90%] max-w-[750px] mx-auto mb-2 flex border border-solid border-slate-300 rounded shadow-lg break-words cursor-pointer" v-for="(user, index) in props.data" :key="index" @click="showModal(user)")
    img(class="border border-slate-300 border-solid" :src="user.picture.large" :class="{'brightness-90':darkMode}" alt="user's avatar")
    div(class="mx-auto px-3 pt-1 pb-2 text-center")
      p(class="font-bold") {{user.name.last}} {{user.name.first }}
      div(class="text-sm")
        p Age: {{user.dob.age}}
        p Gender: {{user.gender}}
        p Location: {{user.location.country}}
  BaseModal(v-show="modal" :modal-data="modalData" :dark-mode="darkMode" @close-modal="showModal")
</template>

<script setup>
import BaseModal from "./BaseModal.vue";
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
