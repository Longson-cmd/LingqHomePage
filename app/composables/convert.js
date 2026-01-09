// /composables/useTime.js
export function useConvert() {
// Convert seconds -> "M:SS"
const minutesSeconds = (sec) => {
  const m = Math.floor(sec / 60)
  const s = (sec % 60).toString().padStart(2, "0")
  return `${m}:${s}`
}

// Convert "M:SS" -> seconds
const seconds = (rawString) => {
  const [m, s] = rawString.split(":").map(Number)
  return m * 60 + s
}


const  cleanWord = (word) => {
  if (!word) return ''

  let w = word.toLowerCase().trim()

  // Unicode normalization (same as unicodedata.normalize)
  w = w.normalize('NFKD')

  // Normalize punctuation
  w = w
    .replace(/’/g, "'")
    .replace(/[–—]/g, "-")

  // Remove unwanted characters (keep letters, numbers, spaces, apostrophes)
  w = w.replace(/[^\w\s']/g, '')

  return w
}

  return {
    minutesSeconds,
    seconds,
    cleanWord
  }
}
