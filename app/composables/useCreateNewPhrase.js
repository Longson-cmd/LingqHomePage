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
const createNewPhrase= (flatSentencesData, startRange, endRange, paraIdx,  status) => {
    const newPhraseData = flatSentencesData.slice(startRange, endRange + 1).map(w => ({...w}))
    const newPhrase = {
        "phrase": newPhraseData,
        "status": status,
        "p_idx": paraIdx,
        "s_idx": newPhraseData[0]["s_idx"],
        "type": "phrase",
        "visible": true
}
    
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




const insertNewPhrase = (listPhrases, newPhrase, startRange) => {
    const indexForNewPhrase = listPhrases.findIndex(item => item['phrase'][0]["idx_w_in_s"] >=startRange)

    if (indexForNewPhrase === -1) { listPhrases.push(newPhrase)}
    else if (listPhrases[indexForNewPhrase]['phrase'].length === newPhrase.phrase.length
      && listPhrases[indexForNewPhrase]['phrase'][0]['idx_w_in_s'] === startRange) 
      { 
   
        listPhrases[indexForNewPhrase] = newPhrase
       }

    else if (listPhrases[indexForNewPhrase]['phrase'][0]['idx_w_in_s'] > startRange) {
      listPhrases.splice(indexForNewPhrase , 0, newPhrase)
    }

    else  {
      if (listPhrases[indexForNewPhrase]['phrase'].length < newPhrase.phrase.length) {
        listPhrases.splice(indexForNewPhrase, 0, newPhrase)
      }
      else {
        listPhrases.splice(indexForNewPhrase + 1, 0, newPhrase)
      }
      
    }

}


const changeStatus = (listPhrases) => {
    let listPreviousPhraseIndexs = []
    for (let i = 0; i < listPhrases.length; i ++) {
    const indexWord = listPhrases[i]['phrase'][0]["idx_w_in_s"]
    for (let k =0; k < listPhrases[i]['phrase'].length; k++) {
        const indexWord = listPhrases[i]['phrase'][k]['w_idx']  
        if (
          listPreviousPhraseIndexs.includes(indexWord)
        ) {
        listPhrases[i]['phrase'][k]['visible_in_phrase'] = false
        }

        else {
          listPreviousPhraseIndexs.push(indexWord)
          listPhrases[i]['phrase'][k]['visible_in_phrase'] = true
        }
    }

    listPhrases[i].visible = listPhrases[i].phrase.some(w => w.visible_in_phrase === true)
    } 

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

