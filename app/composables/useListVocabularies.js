
import {ref} from 'vue'
export function useListVocabularies() {
    const listPhrasesData = ref([
  {
    word: "Break the ice",
    meaning: "To start a conversation in a social setting.",
    showMeaning: false,
    status: 1
  },
  {
    word: "On cloud nine",
    meaning: "Extremely happy or excited.",
    showMeaning: false,
    status: 2
  },
  {
    word: "Hit the books",
    meaning: "To study seriously.",
    showMeaning: false,
    status: 0
  },
  {
    word: "Piece of cake",
    meaning: "Something very easy to do.",
    showMeaning: false,
    status: 4
  },
  {
    word: "Under the weather",
    meaning: "Feeling sick or unwell.",
    showMeaning: false,
    status: 5
  },
  {
    word: "Spill the beans",
    meaning: "To reveal a secret.",
    showMeaning: false,
    status: 1
  },
  {
    word: "Burn the midnight oil",
    meaning: "To work late into the night.",
    showMeaning: false,
    status: 0
  },
  {
    word: "Once in a blue moon",
    meaning: "Very rarely.",
    showMeaning: false,
    status: 3
  },
  {
    word: "Cost an arm and a leg",
    meaning: "Very expensive.",
    showMeaning: false,
    status: 4
  },
  {
    word: "Keep an eye on",
    meaning: "To watch or take care of something.",
    showMeaning: false,
    status: 5
  }
])

    const listWordsData = ref([
  {
    word: "Ambition",
    meaning: "A strong desire to achieve success.",
    showMeaning: false,
    status: 1
  },
  {
    word: "Resilient",
    meaning: "Able to recover quickly from difficulties.",
    showMeaning: false,
    status: 2
  },
  {
    word: "Generous",
    meaning: "Willing to give or share freely.",
    showMeaning: false,
    status: 0
  },
  {
    word: "Innovate",
    meaning: "To introduce new ideas or methods.",
    showMeaning: false,
    status: 4
  },
  {
    word: "Grateful",
    meaning: "Feeling thankful and appreciative.",
    showMeaning: false,
    status: 5
  },
  {
    word: "Confident",
    meaning: "Feeling sure about your abilities.",
    showMeaning: false,
    status: 1
  },
  {
    word: "Adapt",
    meaning: "To adjust to new conditions.",
    showMeaning: false,
    status: 0
  },
  {
    word: "Curious",
    meaning: "Eager to know or learn something.",
    showMeaning: false,
    status: 3
  },
  {
    word: "Efficient",
    meaning: "Working in a well-organized and productive way.",
    showMeaning: false,
    status: 4
  },
  {
    word: "Determine",
    meaning: "To decide firmly or find out exactly.",
    showMeaning: false,
    status: 5
  }
])

    return {
        listPhrasesData,
        listWordsData
    }
}