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

// initial pagination value
function initPagination() {
  let lastNum = totalPage.value;

  if (lastNum <= 9) {
    // if total page < 10, show all page numbers:
    // [1, 2, 3, 4,], [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for (let i = 1; i <= lastNum; i++) {
      pagination.value.push(i);
    }
    return;
  }

  if (props.currentPage <= 2) {
    // [1, 2, 3, '...', 30]
    pagination.value = [1, 2, 3, "...", lastNum];
  } else if (props.currentPage === 3) {
    // [1, 2, 3, 4, '...', 30]
    pagination.value = [1, 2, 3, 4, "...", lastNum];
  } else if (props.currentPage === 4) {
    // [1, 2, 3, 4, 5, '...', 30]
    pagination.value = [1, 2, 3, 4, 5, "...", lastNum];
  } else if (props.currentPage >= lastNum - 1) {
    // [1, '...', 28, 29, 30]
    pagination.value = [1, "...", lastNum - 2, lastNum - 1, lastNum];
  } else if (props.currentPage === lastNum - 2) {
    // [1, '...', 27, 28, 29, 30]
    pagination.value = [
      1,
      "...",
      lastNum - 3,
      lastNum - 2,
      lastNum - 1,
      lastNum,
    ];
  } else if (props.currentPage === lastNum - 3) {
    // [1, '...', 26, 27, 28, 29, 30]
    pagination.value = [
      1,
      "...",
      lastNum - 4,
      lastNum - 3,
      lastNum - 2,
      lastNum - 1,
      lastNum,
    ];
  } else {
    // currentPage is between 4 and the last but 3(4 <= page <= the last but 3), pagination will become:
    // [1, '...', 4, 5, 6, '...', 30]
    // [1, '...', 14, 15, 16, '...', 30]
    // [1, '...', 25, 26, 27, '...', 30]
    pagination.value = [
      1,
      "...",
      props.currentPage - 1,
      props.currentPage,
      props.currentPage + 1,
      "...",
      lastNum,
    ];
  }
}

// when dataPerPage changed, currentPage and pagination should change
watch(
  () => props.dataPerPage,
  (newValue, oldValue) => {
    let oldTotalPage = Math.ceil(props.dataLength / oldValue);
    let newTotalPage = Math.ceil(props.dataLength / newValue);
    let newCurrentPage;
    let newPagination;

    if (newValue < oldValue) {
      // data per page: [30 -> 10], [50 -> 30], [50 -> 30]

      if (oldTotalPage === props.currentPage) {
        // assume data length is 245
        // data per page: [30 -> 10], [50 -> 30]
        // total page: [9 -> 25], [5 -> 9]
        // current page becomes: [9 -> 25], [5 -> 9]
        newCurrentPage = newTotalPage;
      } else if (props.currentPage === 1) {
        // assume data length is 245
        // data per page: [30 -> 10], [50 -> 30]
        // current page becomes: [1 -> 1], [1 -> 1]
        newCurrentPage = 1;
        // but total page will become different
        // so pagination should change
        newPagination = [1, 2, 3, "...", newTotalPage];
        pagination.value = newPagination;
      } else {
        newCurrentPage = Math.round((oldValue * props.currentPage) / newValue);
      }
      changeCurrentPage(newCurrentPage);
      return;
    }

    if (newValue > oldValue) {
      // data per page: [10 -> 30], [30 -> 50], [10 -> 50]

      if (oldTotalPage === props.currentPage) {
        // assume data length is 245
        // data per page: [10 -> 30], [30 -> 50]
        // total page: [25 -> 9], [9 -> 5]
        // current page becomes: [25 -> 9], [9 -> 5]
        newCurrentPage = newTotalPage;
      } else if (props.currentPage === 1) {
        // assume data length is 245
        // data per page: [10 -> 30], [30 -> 50]
        // current page becomes: [1 -> 1], [1 -> 1]
        newCurrentPage = 1;
        // but total page will become different
        // so pagination should change
        newPagination = [1, 2, 3, "...", newTotalPage];
        pagination.value = newPagination;
      } else {
        newCurrentPage = Math.ceil((oldValue * props.currentPage) / newValue);
      }
      changeCurrentPage(newCurrentPage);
      return;
    }
  }
);

// when currentPage changed, pagination should change
watch(
  () => props.currentPage,
  (newValue, oldValue) => {
    // All variables are Number
    let lastNum = totalPage.value;
    let newPagination = [];

    nextTick(() => {
      if (lastNum < 10) {
        // if total page < 10, show all page numbers:
        // [1, 2, 3, 4,], [1, 2, 3, 4, 5, 6, 7, 8, 9]
        for (let i = 1; i <= lastNum; i++) {
          newPagination.push(i);
        }
      } else if (newValue <= 2) {
        // user chooses to go to page 1 or 2, pagination will become:
        // [1, 2, 3, '...', 10]
        newPagination = [1, 2, 3, "...", lastNum];
      } else if (newValue === 3) {
        // user chooses to go to page 3, pagination will become:
        // [1, 2, 3, 4, '...', 10]
        newPagination = [1, 2, 3, 4, "...", lastNum];
      } else if (newValue === 4) {
        // user chooses to go to page 4, pagination will become:
        // [1, 2, 3, 4, 5, '...', 10]
        newPagination = [1, 2, 3, 4, 5, "...", lastNum];
      } else if (newValue === lastNum - 3) {
        // user chooses to go to the last but 3 page, pagination will become:
        // [1, '...', 6, 7, 8, 9, 10]
        newPagination = [
          1,
          "...",
          lastNum - 4,
          lastNum - 3,
          lastNum - 2,
          lastNum - 1,
          lastNum,
        ];
      } else if (newValue === lastNum - 2) {
        // user chooses to go to the last but 2, pagination will become:
        // [1, '...', 7, 8, 9, 10]
        newPagination = [
          1,
          "...",
          lastNum - 3,
          lastNum - 2,
          lastNum - 1,
          lastNum,
        ];
      } else if (newValue >= lastNum - 1) {
        // user chooses to go to the last but 1 or last page, pagination will become:
        // [1, '...', 8, 9, 10]
        newPagination = [1, "...", lastNum - 2, lastNum - 1, lastNum];
      } else {
        // user chooses to go to any page between 4 and the last but 3(4 <= page <= the last but 3), pagination will become:
        // [1, '...', 4, 5, 6, '...', 30]
        // [1, '...', 14, 15, 16, '...', 30]
        // [1, '...', 25, 26, 27, '...', 30]
        newPagination = [
          1,
          "...",
          newValue - 1,
          newValue,
          newValue + 1,
          "...",
          lastNum,
        ];
      }

      pagination.value = newPagination;
    });
  }
);

initPagination();
</script>
