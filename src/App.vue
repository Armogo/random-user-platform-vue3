<template lang="pug">
div
  div(v-if="!isLoading" class="h-screen overflow-y-hidden grid grid-rows-layout" :class="[darkMode ? 'bg-slate-800 text-gray-300' : 'bg-slate-100 text-slate-900']")
    header(class="flex justify-end items-center gap-x-2 pr-4")
      TheSwitchDarkMode(:dark-mode="darkMode" @switch-dark-mode="switchDarkMode")
      TheSwitchDataPerPage(:dark-mode="darkMode" :data-per-page="dataPerPage" @switch-data-per-page="switchDataPerPage")
      TheSwitchViewMode(:view-mode="viewMode" @switch-view-mode="switchViewMode")        
    ViewModeCard(v-if="viewMode === 'card'" :data="renderData" :dark-mode="darkMode")
    ViewModeList(v-else :data="renderData" :dark-mode="darkMode")
    ThePagination(:dark-mode="darkMode" :data-length="data.length" :data-per-page="dataPerPage" :current-page="currentPage" @change-current-page="changeCurrentPage")
  TheIsLoading(v-else)    
</template>

<script setup>
import TheSwitchDarkMode from "./components/TheSwitchDarkMode.vue";
import TheSwitchDataPerPage from "./components/TheSwitchDataPerPage.vue";
import TheSwitchViewMode from "./components/TheSwitchViewMode.vue";
import ViewModeCard from "./components/ViewModeCard.vue";
import ViewModeList from "./components/ViewModeList.vue";
import ThePagination from "./components/ThePagination.vue";
import TheIsLoading from "./components/TheIsLoading.vue";
import { ref, computed } from "vue";
import { apiMethod } from "./utils/helper.js";

const data = ref([]); // Async
const isLoading = ref(true); // wait for server response
const serverIsUnavailable = ref(false); // when server unavailable

const darkMode = ref(false);
const dataPerPage = ref(30);
const currentPage = ref(1);
const viewMode = ref("card");
const renderData = computed(() => {
  let startIndex = (currentPage.value - 1) * dataPerPage.value;
  let endIndex = currentPage.value * dataPerPage.value;

  return data.value.slice(startIndex, endIndex);
});

async function fetchUserData(number) {
  try {
    const response = await apiMethod.getHowManyUsers(number);

    data.value = response.data.results;
    isLoading.value = false;
  } catch (error) {
    serverIsUnavailable.value = true;
    console.log("error", error);
  }
}

function switchDarkMode() {
  darkMode.value = !darkMode.value;
  localStorage.setItem("darkMode", JSON.stringify(darkMode.value));
}

function switchDataPerPage(number) {
  dataPerPage.value = number;
  localStorage.setItem("dataPerPage", JSON.stringify(number));
}

function switchViewMode(string) {
  viewMode.value = string;
  localStorage.setItem("viewMode", JSON.stringify(string));
}

function changeCurrentPage(number) {
  // store the new currentPage
  localStorage.setItem("currentPage", JSON.stringify(number));
  currentPage.value = number;
}

fetchUserData(3010);

// get previous value of darkMode when page reloaded
if (localStorage.darkMode) {
  darkMode.value = JSON.parse(localStorage.darkMode);
}

// get previous value of dataPerPage when page reloaded
if (["10", "30", "50"].includes(localStorage.dataPerPage)) {
  dataPerPage.value = JSON.parse(localStorage.dataPerPage);
}

// get previous value of viewMode when page reloaded
if (localStorage.viewMode) {
  viewMode.value = JSON.parse(localStorage.viewMode);
}

// get previous value of currentPage when page reloaded
if (localStorage.currentPage) {
  currentPage.value = JSON.parse(localStorage.getItem("currentPage"));
}
</script>
