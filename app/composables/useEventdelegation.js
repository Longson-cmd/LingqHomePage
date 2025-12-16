
import {ref} from 'vue'

export function useEventDelegation() {


const startPointer = ref(null)
const currentPointer = ref(null)
const isDraging = ref(false)


const getWordData = (e) => {

  const target = e.target

  if (!target instanceof HTMLElement) return null
  const el = target.closest('.word-item')

  if (!el) return

  return {
    w_idx : Number(el.dataset.wIdx),
    s_idx : Number(el.dataset.sIdx),
    idx_w_in_s : Number(el.dataset.idxWInS),
    p_idx : Number(el.dataset.pIdx)
  }
}


const onPointerdown = (indexWord, indexSentence, indexWordInSentence, indexPara) => {
  isDraging.value = true

  startPointer.value = [indexWord, indexSentence, indexWordInSentence, indexPara]
  currentPointer.value = [indexWord, indexSentence, indexWordInSentence, indexPara]

  // console.log('startPointer', startPointer.value[0])
}

const onPointerEnter = (indexWord, indexSentence, indexWordInSentence, indexPara) => {
  if (!isDraging.value) return

  
  currentPointer.value = [indexWord, indexSentence, indexWordInSentence, indexPara]


}

const handlePointerDown = (e) => {
  const wordData = getWordData(e)

  if (!wordData) return

  onPointerdown(
    wordData.w_idx,
    wordData.s_idx,
    wordData.idx_w_in_s,
    wordData.p_idx,
  )
}

const handlePointerEnter = (e) => {
   const wordData = getWordData(e)
  

  if (!wordData) return

  onPointerEnter(
    wordData.w_idx,
    wordData.s_idx,
    wordData.idx_w_in_s,
    wordData.p_idx,
  )
}

  return {
    startPointer,
    currentPointer,
    isDraging,
    handlePointerDown,
    handlePointerEnter
  }
}
