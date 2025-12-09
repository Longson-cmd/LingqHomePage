<template>
    <div class="max-w-md mx-auto  mt-20 flex flex-wrap gap-y-7">
        <div v-for="(para, idPara) in lessondata" :key="idPara" class="text-3xl flex flex-wrap gap-y-7 text-start">
          <div v-for="(sentence, idSentece) in para" :key="idSentece" class="flex  flex-wrap px-2 gap-y-7 gap-x-1">
              <span v-for="(item, idItem) in sentence" :key="idItem" >
                <span v-if="item['type'] === 'phrase'" class="flex px-1 gap-y-7 h-[35px] item-center gap-x-1 rounded  border border-transparent hover:border-yellow-300 " :class="['status-' + item['status'] , item['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']">
                  <span v-for="(word) in item['phrase']" :class="['status-' +  word['status'],   word['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']" class="word-item">
                      {{word['word']}}
                  </span>
                </span>
    
                <span v-else  class="flex  h-[35px]    items-center">
                  <span :class="['status-' + item['status'] , 'word-item',  item['status'] === 6 ? 'hover:border-blue-600' : 'hover:border-yellow-300']">
                     {{item['word']}}
                  </span>  
                </span>
              </span>
          </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { getlesson } from '#imports';
const lessondata= getlesson()

onMounted(() => console.log("lessondata :", lessondata))

</script>

<style >
.status-1 { @apply bg-yellow-300 ;}

.status-2 { @apply bg-yellow-200}
.status-3 { @apply bg-yellow-100}
/* .status-4 { @apply underline decoration-dashed decoration-2 underline-offset-4 decoration-gray-500} */
/* instead of underline */
.status-4 {
  @apply border-b border-dashed border-b-gray-300;
}

.status-6 { @apply bg-blue-300}

.word-item { @apply flex rounded h-[30px] cursor-pointer px-2 items-center border border-transparent  }



</style>