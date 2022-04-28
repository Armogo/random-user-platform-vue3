<template lang="pug">  
div(class="fixed z-[1] top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-[#000000f3]" tabindex="-1" aria-hidden="true" @click.self="$emit('closeModal')")
  div(class="fixed z-[2] left-[50%] top-[10%] w-[90%] -translate-x-1/2 sm:w-[80%] max-w-[750px]" :class="{'text-gray-800': !darkMode}")
    div(class="bg-clip-padding rounded-md text-current" :class="darkMode ? 'bg-slate-800' : 'bg-white'")
      div(class="flex flex-shrink-0 items-center justify-between py-1 px-3 border-b border-gray-200 rounded-t-md")        
        h5(class="text-xl font-medium leading-normal ") User info        
        svg(xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="32" height="32" viewBox="0 0 32 32" xml:space="preserve")
          g(transform="matrix(1 0 0 1 16 16)" id="e4da5a8c-d6fb-413a-a9c7-3c85702ff0b0")
            rect(style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255 255 255 / 0%); fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke" x="-16" y="-16" rx="0" ry="0" width="32" height="32")                              
          g(transform="matrix(0.18 0 0 0.18 16 16)" id="7f28a869-352a-40ea-a344-4fa987683626" class="cursor-pointer" @click.stop="$emit('closeModal')")
            path(style="stroke: rgb(0,0,0); stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill-rule: nonzero; opacity: 1;" vector-effect="non-scaling-stroke" transform=" translate(-50, -50)" d="M 16.28 19.945 L 19.957 16.32 C 22.060000000000002 14.166 25.578000000000003 14.166 27.681 16.32 L 50.007000000000005 38.595 L 72.333 16.32 C 74.43599999999999 14.166 77.954 14.166 80.054 16.32 L 83.68 19.945 C 85.834 22.046 85.834 25.566000000000003 83.68 27.668 L 61.405 49.993 L 83.68 72.32 C 85.834 74.422 85.834 77.939 83.68 80.04299999999999 L 80.054 83.72099999999999 C 77.95400000000001 85.82 74.436 85.82 72.333 83.72099999999999 L 50.007 61.393 L 27.681 83.721 C 25.578 85.82000000000001 22.060000000000002 85.82000000000001 19.957 83.721 L 16.28 80.043 C 14.180000000000001 77.93900000000001 14.180000000000001 74.42200000000001 16.28 72.32000000000001 L 38.606 49.99300000000001 L 16.28 27.667 C 14.18 25.566 14.18 22.046 16.28 19.945 z" stroke-linecap="round" :class="[darkMode ? 'fill-[#c5c5c5]' : 'fill-[#000000]']")                      
      div(class="relative p-3 flex flex-wrap justify-center sm:justify-evenly sm:flex-nowrap")
        img(:src="modalData?.picture.large" alt="user's avatar" class="basis-[248px] sm:h-full" :class="{'brightness-90':darkMode}")
        div(class="px-3 text-base break-all sm:text-lg lg:text-xl") 
          p 
            span(class="font-bold") Name: 
            . 
              {{modalData?.name.last}} {{modalData?.name.first }}
          p 
            span(class="font-bold") Age: 
            .
              {{modalData?.dob.age}}
          p 
            span(class="font-bold") Gender: 
            .
              {{modalData?.gender}}
          p 
            span(class="font-bold") Location: 
            . 
              {{modalData?.location.city}}, {{modalData?.location.country}}
          p 
            span(class="font-bold") Email: 
            . 
              {{modalData?.email}}
          p 
            span(class="font-bold") Phone: 
            . 
              {{modalData?.phone}}      
</template>

<script setup>
defineProps({
  modalData: Object,
  darkMode: Boolean,
});
defineEmits(['closeModal'])
</script>
