// /composables/useTime.js
export function useTime() {
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

  return {
    minutesSeconds,
    seconds
  }
}
