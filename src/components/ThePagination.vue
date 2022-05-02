<template lang="pug">      
nav(class="py-1 relative z-0 flex justify-between w-[98%] mx-auto sm:w-96 sm:justify-center sm:gap-x-2" aria-label="Pagination")
  div(class="border-gray-300 flex justify-center items-center border rounded-l-md text-sm font-medium grow cursor-pointer" :class="darkMode ? 'bg-transparent hover:bg-blue-500' : 'hover:bg-[#d3c5e8]'" @click.stop="goPrevPage")
    span.sr-only Previous
    svg(class="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true")
      path(fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd")        
  div(class="border-gray-300 flex justify-center items-center border text-sm font-medium grow" :class="[darkMode ? 'bg-transparent hover:bg-blue-500' : 'hover:bg-[#d3c5e8]', {'pointer-events-none': page === '...'}]" v-for="(page, index) of pagination" :key="index")
    input(type="radio" name="page" class="hidden peer" :id="page" :value="page" :checked="currentPage === page"  @click.stop="changeCurrentPage(page)")
    label(:for="page" class="h-full w-full flex justify-center items-center cursor-pointer" :class="darkMode ? 'peer-checked:bg-blue-500' : 'peer-checked:bg-[#d3c5e8]'") {{page}}
  div(class="border-gray-300 flex justify-center items-center border rounded-r-md text-sm font-medium grow cursor-pointer" :class="darkMode ? 'bg-transparent hover:bg-blue-500' : 'hover:bg-[#d3c5e8]'" @click.stop="goNextPage")
    span.sr-only Next         
    svg(class="h-5 w-5 fill-current rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true")
      path(fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd")
</template>

<script setup>
import { ref, watch, computed, nextTick } from "vue";

const props = defineProps({
  darkMode: Boolean,
  dataLength: Number,
  dataPerPage: Number,
  currentPage: Number,
});
const emit = defineEmits(["changeCurrentPage"]);
const totalPage = computed(() => {
  return Math.ceil(props.dataLength / props.dataPerPage);
});
const pagination = ref([]);

// switch previous or next page arrow
function goPrevPage() {
  if (props.currentPage > 1) {
    emit("changeCurrentPage", props.currentPage - 1);
  }
}

function changeCurrentPage(number) {
  emit("changeCurrentPage", number);
}

function goNextPage() {
  if (props.currentPage < totalPage.value) {
    emit("changeCurrentPage", props.currentPage + 1);
  }
}

function createPagination(currentPage) {
  let lastNum = totalPage.value;
  let newPagination = [];

  if (lastNum < 10) {
    // if total page < 10, show all page numbers:
    // [1, 2, 3, 4,], [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = 1; i <= lastNum; i++) {
      newPagination.push(i);
    }
  } else if (currentPage < 5) {
    // [1, 2, 3, '...', 30]
    // [1, 2, 3, 4, '...', 30]
    // [1, 2, 3, 4, 5, '...', 30]
    for (let i = 1; i <= currentPage + 1; i++) {
      newPagination.push(i);
    }
    newPagination.push("...");
    newPagination.push(lastNum);
  } else if (currentPage > lastNum - 4) {
    // [1, '...', 28, 29, 30]
    // [1, '...', 27, 28, 29, 30]
    // [1, '...', 26, 27, 28, 29, 30]
    for (let i = currentPage - 1; i < lastNum + 1; i++) {
      newPagination.push(i);
    }
    newPagination.unshift("...");
    newPagination.unshift(1);
  } else {
    // currentPage is between 4 and the last but 3(4 <= page <= the last but 3), pagination will become:
    // [1, '...', 4, 5, 6, '...', 30]
    // [1, '...', 14, 15, 16, '...', 30]
    // [1, '...', 25, 26, 27, '...', 30]
    newPagination = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      lastNum,
    ];
  }
  pagination.value = newPagination;
}

// initial pagination value
function initPagination() {
  createPagination(props.currentPage);
}

// when dataPerPage changed, currentPage and pagination should change
watch(
  () => props.dataPerPage,
  (newValue, oldValue) => {
    let oldTotalPage = Math.ceil(props.dataLength / oldValue);
    let newTotalPage = Math.ceil(props.dataLength / newValue);
    let newCurrentPage = Math.round((oldValue * props.currentPage) / newValue);
    let newPagination;

    if (props.currentPage === 1) {
      // assume data length is 245
      // data per page: [30 -> 10], [50 -> 30]
      // current page becomes: [1 -> 1], [1 -> 1]
      newCurrentPage = 1;
      // but total page will become different
      // so pagination should change
      newPagination = [1, 2, 3, "...", newTotalPage];
      pagination.value = newPagination;
    } else if (newCurrentPage < 1) {
      newCurrentPage = 1;
    } else if (newCurrentPage > newTotalPage) {
      // assume data length is 245
      // data per page: [30 -> 10], [50 -> 30]
      // total page: [9 -> 25], [5 -> 9]
      // current page becomes: [9 -> 25], [5 -> 9]
      newCurrentPage = newTotalPage;
    }
    changeCurrentPage(newCurrentPage);
  }
);

// when currentPage changed, pagination should change
watch(
  () => props.currentPage,
  (newValue, oldValue) => {
    nextTick(() => createPagination(newValue));
  }
);

initPagination();
</script>
