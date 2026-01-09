
export function useGooleTranslate (text) {

let translated = ''

const onTranslate = async (text) => {
    
    try {
        const data = await $fetch(
        'https://translate.googleapis.com/translate_a/single',
        {
            params: {
                client: 'gtx',
                sl: 'en',
                tl: 'vi',
                dt: 't',
                q: text
            }
        }
        )
        const result = data?.[0]?.[0]?.[0]?? ''
        translated = result
        return result
    }

    catch (err) {
        console.error('Translation failed', err)
        translated = ''
        return ''
    }
}

// 🟢 Speak English input text
function speakEnglish(text) {
    try {  // Create a speech utterance using the input text
    const utterance = new SpeechSynthesisUtterance(text)

    // Set the language/accent for pronunciation
    utterance.lang = 'en-US'

    // Control speaking speed (1 = normal)
    utterance.rate = 1

    utterance.voice = speechSynthesis
        .getVoices()
        .find(v => v.name === 'Microsoft David – English')

    // Send the utterance to the browser’s speech engine to play audio
    speechSynthesis.speak(utterance)}
    catch (error) {
        console.error('there is an error with speakEnglish', error)
    }
}

    

return {
    translated,
    onTranslate,
    speakEnglish
}}