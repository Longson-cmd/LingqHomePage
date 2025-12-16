export function useCreateNewPhrase () {

// GET INDEX AND DATA OF THE SENTENCE IN THE PARAGRAPH
const originalSentenceData = (lessondata, paraIdx, sentenceIdx) => {
        const start = lessondata.value[paraIdx].findIndex(item => item['s_idx'] === sentenceIdx)

        const end = lessondata.value[paraIdx].findLastIndex(item => item['s_idx'] === sentenceIdx)
        const copyparaData = JSON.parse(JSON.stringify(lessondata.value[paraIdx]))
        const copySentenceData = copyparaData.filter(item => item['s_idx'] === sentenceIdx)

       
        return { start, end, copySentenceData }
}

//  createData of newPhrase
const createNewPhrase= (flatSentencesData, startRange, endRange) => {
    const newPhraseData = flatSentencesData.slice(startRange, endRange + 1).map(w => ({...w, 'visible_in_phrase' : true}))

    const newPhrase = {
        "phrase": newPhraseData,
        "status": 6,
        "p_idx": 3,
        "s_idx": newPhraseData[0]["s_idx"],
        "type": "phrase",
        "visible": true
}
    // console.log("newPhrase ", newPhrase)
    return newPhrase
}

// GET ALL PHRASES IN THE SENTENCE
const getAllexsistingPhrases = (copySentenceData) => {
    const listPhrases = []
    copySentenceData.forEach((item, idx) => {
      if (copySentenceData[idx]['type'] === "phrase") {

        listPhrases.push(item)
      }
    })

    return listPhrases
}


const changeStatus = (listPhrases, startRange, endRange) => {

    for (let i = 0; i < listPhrases.length; i ++) {
    const indexWordStart = listPhrases[i]['phrase'][0]["idx_w_in_s"]
    for (let k =0; k < listPhrases[i]['phrase'].length; k++) {  
        if (startRange <=k + indexWordStart && k + indexWordStart <=endRange) {
        listPhrases[i]['phrase'][k]['visible_in_phrase'] = false
        }
    }

    listPhrases[i].visible = listPhrases[i].phrase.some(w => w.visible_in_phrase === true)

}}


const insertNewPhrase = (listPhrases, newPhrase, startRange) => {
    const indexForNewPhrase = listPhrases.findIndex(item => item['phrase'][0]["idx_w_in_s"] >=startRange)

    if (indexForNewPhrase === -1) { listPhrases.push(newPhrase)}
    else if (listPhrases[indexForNewPhrase]['phrase'].length === newPhrase.phrase.length
      && listPhrases[indexForNewPhrase]['phrase'][0]['idx_w_in_s'] === startRange) 
      { 
   
        listPhrases[indexForNewPhrase] = newPhrase
       }

    else {
      if (listPhrases[indexForNewPhrase]['phrase'].length > newPhrase.phrase.length) {
        listPhrases.splice(indexForNewPhrase, 0, newPhrase)
      }
      else {
        listPhrases.splice(indexForNewPhrase + 1, 0, newPhrase)
      }
      
    }

    console.log('list phrase :', listPhrases)
}

const buildSentence = (listPhrases, flatSentencesData) => {
    const newDataSentence = []

    let indexLastItem = -1
    for (let i = 0; i < listPhrases.length; i ++) {
      const listWordsBeforeCurrentPhrase = flatSentencesData.filter(item => item['idx_w_in_s'] < listPhrases[i]['phrase'][0]['idx_w_in_s'] && item['idx_w_in_s'] > indexLastItem)
      newDataSentence.push(...listWordsBeforeCurrentPhrase)
      indexLastItem = Math.max(listPhrases[i]['phrase'][0]['idx_w_in_s'] + listPhrases[i]['phrase'].length -1, indexLastItem)
      newDataSentence.push(listPhrases[i])
    }
   

    const listWords = flatSentencesData.filter(item =>item['idx_w_in_s'] > indexLastItem)
    newDataSentence.push(...listWords)

    return newDataSentence
}
    return {
        originalSentenceData,
        createNewPhrase,
        getAllexsistingPhrases,
        changeStatus,
        insertNewPhrase, 
        buildSentence,
    }
}

