

const {
  originalSentenceData,
  createNewPhrase,
  getAllexsistingPhrases,
  changeStatus,
  insertNewPhrase,
  buildSentence
} = useCreateNewPhrase()


export function useKeyboard(startPointer, currentPointer, lessondata,currentPage, totalPage, emitStatus)  {

/**
 * Keyboard handler:
 * - 'x' removes an existing phrase
 * - '1'..'5' assigns status and creates/updates phrase
 */
const changePhraseStatus = (e) => {
  const listKeys = ['x', '1', '2', '3', '4', '5']
  if (!listKeys.includes(e.key)) return

  const newStatus = (e.key === 'x') ? 0 : Number(e.key)
  emitStatus(newStatus)
  // Guard: need a valid selection
  if (!startPointer.value || !currentPointer.value) return
  if (startPointer.value[1] !== currentPointer.value[1]) return

  const a = Math.min(startPointer.value[2], currentPointer.value[2])
  const b = Math.max(startPointer.value[2], currentPointer.value[2])

  // Identify paragraph and sentence for data mutation
  const paraIdx = currentPointer.value[3]
  const sentenceIdx = currentPointer.value[1]

    /**
   * originalSentenceData returns:
   * - start/end: slice range inside lessondata[paraIdx]
   * - copySentenceData: a copy of sentence items (word/phrase objects)
   */
  const { start, end, copySentenceData } = originalSentenceData(lessondata, paraIdx, sentenceIdx)

  // Flatten sentence into visible words only (phrases -> visible words)
  const flatSentencesData = copySentenceData.flatMap((item) =>
    item.type === 'phrase'
      ? item.phrase.filter((w) => w.visible_in_phrase === true)
      : [item]
  )

  // Extract all phrase blocks in this sentence
  const listPhrases = getAllexsistingPhrases(copySentenceData)
  
  // Guard: ignore single-word selections (based on your current rule)
  if (a === b) {
      const paraData = lessondata.value[paraIdx] 

      const indexInProse = currentPointer.value[0]

      const indexInParaData = paraData.findIndex(item => item['w_idx'] === indexInProse)

      if (indexInParaData === -1) {


        for (let i = 0; i < paraData.length; i++) {
          if (paraData[i]['type'] === 'phrase') {
            for (let k = 0; k < paraData[i]['phrase'].length; k++) {
              if (paraData[i]['phrase'][k]['w_idx'] === indexInProse) {
       
                paraData[i]['phrase'][k]['status'] = newStatus
              }
            }
          }
        }


      }

      else {
        paraData[indexInParaData]['status'] = newStatus

      }
    return
  }


  if (e.key === 'x') {
    /* ---------------- Remove phrase ---------------- */
    const indexForNewPhrase = listPhrases.findIndex(
      (item) => item.phrase[0].idx_w_in_s === a
    )

    // Only remove if selection matches phrase length exactly
    if (
      indexForNewPhrase === -1 ||
      listPhrases[indexForNewPhrase].phrase.length !== b - a + 1
    ) {
      return
    }

    listPhrases.splice(indexForNewPhrase, 1)
  } else {
    /* ---------------- Create / update phrase ---------------- */
    const newPhrase = createNewPhrase(flatSentencesData, a, b, paraIdx, e.key)
    insertNewPhrase(listPhrases, newPhrase, a)
  }

  // Synchronize visibility/status flags after phrase changes
  changeStatus(listPhrases)

  // Rebuild sentence data (word/phrase structure) from current state
  const newDataSentence = buildSentence(listPhrases, flatSentencesData)

  // Commit updated sentence back into lessondata
  lessondata.value[paraIdx].splice(start, end - start + 1, ...newDataSentence)
}


const moveNextPrevious = (e) => {
    if (e.key === 'ArrowLeft' && e.shiftKey) {
      e.preventDefault();
      currentPage.value = Math.max(1, currentPage.value -1)
    }

    if (e.key === 'ArrowRight' && e.shiftKey) {
      e.preventDefault();
      currentPage.value = Math.min(currentPage.value + 1, totalPage.value)
    }

    if (e.key === 'ArrowRight' ) {

      if (!currentPointer.value || !startPointer.value) return
      const wordIndex = currentPointer.value[0]
      const paraIndex = currentPointer.value[3]
  

      for (let i = paraIndex; i < lessondata.value.length; i++) {
        const paraData = lessondata.value[i]
        const nextIndex = paraData.findIndex(item => (item['w_idx'] > wordIndex || item['phrase']?.[0]?.['w_idx'] > wordIndex) && [1,2,3,4, 6].includes(item['status']) )
        if (nextIndex === -1) continue
        console.log('nextIndex' , nextIndex)
        console.log('paraData[nextIndex]', paraData[nextIndex])
        if (paraData[nextIndex]['type'] === 'phrase') {
          
          const startItem = paraData[nextIndex]['phrase'][0]
          const endItem = paraData[nextIndex]['phrase'][paraData[nextIndex]['phrase'].length-1]
          startPointer.value = [startItem['w_idx'], startItem['s_idx'], startItem['idx_w_in_s'] , startItem['p_idx']]
          currentPointer.value = [endItem['w_idx'], endItem['s_idx'], endItem['idx_w_in_s'] , endItem['p_idx']]
        }
        else {
            const startItem = paraData[nextIndex]
            startPointer.value = [startItem['w_idx'], startItem['s_idx'], startItem['idx_w_in_s'] , startItem['p_idx']]
            currentPointer.value = [startItem['w_idx'], startItem['s_idx'], startItem['idx_w_in_s'] , startItem['p_idx']]
        }
        break
      }
      
    }
    if (e.key === 'ArrowLeft' ) {

      if (!currentPointer.value || !startPointer.value) return
      const wordIndex = startPointer.value[0]
      const paraIndex = startPointer.value[3]
  

      for (let i = paraIndex; i >= 0; i--) {
        const paraData = lessondata.value[i]
        const lastIndex = paraData.findLastIndex(item => (item['w_idx'] < wordIndex || item['phrase']?.[0]?.['w_idx'] < wordIndex) && [1,2,3,4,6].includes(item['status']) )
        if (lastIndex === -1) continue
        console.log('lastIndex' , lastIndex)
        console.log('paraData[lastIndex]', paraData[lastIndex])
        if (paraData[lastIndex]['type'] === 'phrase') {
          
          const startItem = paraData[lastIndex]['phrase'][0]
          const endItem = paraData[lastIndex]['phrase'][paraData[lastIndex]['phrase'].length-1]
          startPointer.value = [startItem['w_idx'], startItem['s_idx'], startItem['idx_w_in_s'] , startItem['p_idx']]
          currentPointer.value = [endItem['w_idx'], endItem['s_idx'], endItem['idx_w_in_s'] , endItem['p_idx']]
        }
        else {
            const startItem = paraData[lastIndex]
            startPointer.value = [startItem['w_idx'], startItem['s_idx'], startItem['idx_w_in_s'] , startItem['p_idx']]
            currentPointer.value = [startItem['w_idx'], startItem['s_idx'], startItem['idx_w_in_s'] , startItem['p_idx']]
        }
        break
      }
      
    }

    if (e.key === 'b' ) {

      if (!currentPointer.value || !startPointer.value) return
      const wordIndex = currentPointer.value[0]
      const paraIndex = currentPointer.value[3]
  

      for (let i = paraIndex; i < lessondata.value.length; i++) {
        const paraData = lessondata.value[i]
        const nextIndex = paraData.findIndex(item => (item['w_idx'] > wordIndex || item['phrase']?.[0]?.['w_idx'] > wordIndex) && item['status'] === 6 )
        if (nextIndex === -1) continue
        console.log('nextIndex' , nextIndex)
        console.log('paraData[nextIndex]', paraData[nextIndex])
        if (paraData[nextIndex]['type'] === 'phrase') {
          
          const startItem = paraData[nextIndex]['phrase'][0]
          const endItem = paraData[nextIndex]['phrase'][paraData[nextIndex]['phrase'].length-1]
          startPointer.value = [startItem['w_idx'], startItem['s_idx'], startItem['idx_w_in_s'] , startItem['p_idx']]
          currentPointer.value = [endItem['w_idx'], endItem['s_idx'], endItem['idx_w_in_s'] , endItem['p_idx']]
        }
        else {
            const startItem = paraData[nextIndex]
            startPointer.value = [startItem['w_idx'], startItem['s_idx'], startItem['idx_w_in_s'] , startItem['p_idx']]
            currentPointer.value = [startItem['w_idx'], startItem['s_idx'], startItem['idx_w_in_s'] , startItem['p_idx']]
        }
        break
      }
      
    }
}

    return {
        changePhraseStatus,
        moveNextPrevious
    }
}