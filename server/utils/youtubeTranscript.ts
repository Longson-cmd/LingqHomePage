// Small type for one caption track from YouTube player response.
type CaptionTrack = {
  // URL to download caption XML.
  baseUrl: string
  // Language code of this track (example: "en", "th").
  languageCode?: string
}

// Final output shape for each subtitle item.
export type TranscriptItem = {
  // Start time in seconds.
  start: number
  // Duration in seconds.
  duration: number
  // Subtitle text content.
  text: string
}

// STEP 1: Extract `videoId` from incoming YouTube URL.
function extractVideoId(videoUrl: string): string {
  // Parse the input URL safely.
  const url = new URL(videoUrl)

  // Handle short URL format: https://youtu.be/<id>
  if (url.hostname === 'youtu.be') {
    const shortId = url.pathname.split('/').filter(Boolean)[0]
    if (shortId) {
      return shortId
    }
  }

  // Handle watch URL format: https://www.youtube.com/watch?v=<id>
  const watchId = url.searchParams.get('v')
  if (watchId) {
    return watchId
  }

  // Split path for other formats like /embed/<id> or /shorts/<id>.
  const parts = url.pathname.split('/').filter(Boolean)

  // Handle embed URL format.
  const embedIndex = parts.indexOf('embed')
  if (embedIndex >= 0 && parts[embedIndex + 1]) {
    return parts[embedIndex + 1]
  }

  // Handle shorts URL format.
  const shortsIndex = parts.indexOf('shorts')
  if (shortsIndex >= 0 && parts[shortsIndex + 1]) {
    return parts[shortsIndex + 1]
  }

  // If no known pattern matched, stop here.
  throw new Error('Could not extract YouTube videoId from URL')
}

// STEP 2: Fetch YouTube homepage HTML.
async function fetchYouTubeHomeHtml(): Promise<string> {
  // Request the main YouTube page.
  const response = await fetch('https://www.youtube.com')

  // If request fails, throw a readable error.
  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube homepage: ${response.status}`)
  }
  // Return page HTML as string.
  return response.text()
}

// STEP 2 (continued): Extract INNERTUBE_API_KEY from homepage HTML.
function extractInnertubeApiKey(html: string): string {
  // Match key from JSON-like text embedded in HTML.
  const match = html.match(/"INNERTUBE_API_KEY":"([^"]+)"/)

  // Throw if key is not found.
  if (!match?.[1]) {
    throw new Error('INNERTUBE_API_KEY not found in YouTube homepage HTML')
  }
  // Return extracted key.
  return match[1]
}

// STEP 2 (continued): Extract INNERTUBE_CLIENT_VERSION from homepage HTML.
function extractInnertubeClientVersion(html: string): string {
  const match = html.match(/"INNERTUBE_CLIENT_VERSION":"([^"]+)"/)
  if (!match?.[1]) {
    throw new Error('INNERTUBE_CLIENT_VERSION not found in YouTube homepage HTML')
  }
  return match[1]
}

// STEP 3: Call YouTube player endpoint with videoId.
async function fetchPlayerResponse(
  apiKey: string,
  clientVersion: string,
  videoId: string
): Promise<any> {
  // POST player request using extracted API key.
  const response = await fetch(`https://www.youtube.com/youtubei/v1/player?key=${apiKey}`, {
    method: 'POST',
    headers: {
      // Send JSON body.
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      Origin: 'https://www.youtube.com',
      Referer: 'https://www.youtube.com/'
    },
    body: JSON.stringify({
      // Video we want caption data for.
      videoId,
      context: {
        client: {
          // Use web client context.
          clientName: 'WEB',
          clientVersion,
          hl: 'vi',
          gl: 'VN'
        }
      }
    })
  })

  // Stop if request failed.
  if (!response.ok) {
    throw new Error(`Failed to fetch YouTube player data: ${response.status}`)
  }

  // Return parsed JSON response.
  const data = await response.json()

  const status = data?.playabilityStatus?.status

    console.log('apiKey:', apiKey)
  console.log('clientVersion:', clientVersion)
  console.log('videoId:', videoId)
  console.log('data', data)
  if (status && status !== 'OK') {
    const reason = data?.playabilityStatus?.reason || 'Unknown reason'
    throw new Error(`YouTube playability check failed: ${status} (${reason})`)
  }



  return data
}

// STEP 4: Read captionTracks from player response.
function getCaptionTracks(playerResponse: any): CaptionTrack[] {
  // Safely access nested path; return empty array if missing.
  return playerResponse?.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? []
}

// STEP 5: Pick one caption track (prefer exact language match).
function pickCaptionTrack(tracks: CaptionTrack[], lang?: string): CaptionTrack {
  // No tracks means we cannot continue.
  if (!tracks.length) {
    throw new Error('No caption tracks found for this video')
  }

  // If no language requested, use first track.
  if (!lang) {
    return tracks[0]
  }

  // Try exact language code match (case-insensitive).
  const target = lang.toLowerCase()
  const exactTrack = tracks.find((track) => track.languageCode?.toLowerCase() === target)
  if (exactTrack) {
    return exactTrack
  }

  // Fallback: allow prefix match (example: "en" matches "en-US").
  const prefixTrack = tracks.find((track) => track.languageCode?.toLowerCase().startsWith(target))
  if (prefixTrack) {
    return prefixTrack
  }

  // Fallback to first track if exact match not found.
  return tracks[0]
}

// STEP 6: Fetch caption XML from selected track `baseUrl`.
async function fetchCaptionXml(baseUrl: string): Promise<string> {
  // Download caption XML.
  const response = await fetch(baseUrl)

  // Stop if XML request failed.
  if (!response.ok) {
    throw new Error(`Failed to fetch caption XML: ${response.status}`)
  }
  // Return XML string.
  return response.text()
}

// Helper: decode common XML entities to normal text.
function decodeXmlText(text: string): string {
  return text
    // Convert escaped ampersand.
    .replace(/&amp;/g, '&')
    // Convert escaped less-than.
    .replace(/&lt;/g, '<')
    // Convert escaped greater-than.
    .replace(/&gt;/g, '>')
    // Convert escaped double quote.
    .replace(/&quot;/g, '"')
    // Convert escaped single quote (numeric entity).
    .replace(/&#39;/g, "'")
    // Convert escaped single quote (named entity).
    .replace(/&apos;/g, "'")
}

// STEP 7: Parse XML <text start="..." dur="..."> into transcript items.
function parseCaptionXml(xml: string): TranscriptItem[] {
  // Store parsed output.
  const items: TranscriptItem[] = []
  // Match each <text ...>...</text> block.
  const textTagRegex = /<text([^>]*)>([\s\S]*?)<\/text>/g

  // Loop through all text nodes.
  for (const match of xml.matchAll(textTagRegex)) {
    // Attributes part, example: start="1.2" dur="2.5"
    const attrs = match[1] ?? ''
    // Raw inner text from the XML node.
    const rawText = match[2] ?? ''

    // Extract start attribute.
    const startMatch = attrs.match(/start="([^"]+)"/)
    // Extract duration attribute.
    const durMatch = attrs.match(/dur="([^"]+)"/)

    // Convert to number; fallback to 0 if missing.
    const start = Number(startMatch?.[1] ?? '0')
    // Convert to number; fallback to 0 if missing.
    const duration = Number(durMatch?.[1] ?? '0')

    // Push one subtitle item.
    items.push({
      start,
      duration,
      // Decode entities so text is readable.
      text: decodeXmlText(rawText)
    })
  }

  // Return all parsed subtitle items.
  return items
}

// Public function: run STEP 1 -> STEP 7 in order.
export async function getTranscript(videoUrl: string, lang?: string): Promise<TranscriptItem[]> {
  // STEP 1
  const videoId = extractVideoId(videoUrl)
  // STEP 2
  const homeHtml = await fetchYouTubeHomeHtml()
  // STEP 2
  const apiKey = extractInnertubeApiKey(homeHtml)
  // STEP 2
  const clientVersion = extractInnertubeClientVersion(homeHtml)

  // STEP 3
  const playerResponse = await fetchPlayerResponse(apiKey, clientVersion, videoId)
  // STEP 4
  const captionTracks = getCaptionTracks(playerResponse)
  // STEP 5
  const selectedTrack = pickCaptionTrack(captionTracks, lang)
  // STEP 6
  const captionXml = await fetchCaptionXml(selectedTrack.baseUrl)
  // STEP 7
  return parseCaptionXml(captionXml)
}
