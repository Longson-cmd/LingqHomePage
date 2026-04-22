import { getTranscript } from '../utils/youtubeTranscript'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const videoUrl = String(query.videoUrl || '').trim()
  const lang = typeof query.lang === 'string' && query.lang.trim() ? query.lang.trim() : undefined

  if (!videoUrl) {
    throw createError({ statusCode: 400, statusMessage: 'videoUrl is required' })
  }

  const items = await getTranscript(videoUrl, lang)
  return {
    count: items.length,
    items
  }
})
