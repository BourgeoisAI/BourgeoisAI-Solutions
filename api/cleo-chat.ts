// ✅ Forces Node runtime instead of Edge
export const config = { runtime: 'nodejs20.x' }

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Safe body parsing (Vercel edge sometimes sends strings)
  let body = {}
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' })
  }

  const message = body?.message || ''
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY

  if (!GEMINI_API_KEY) {
    console.error('❌ Missing GEMINI_API_KEY')
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY' })
  }

  if (!message.trim()) {
    return res.status(400).json({ error: 'Empty message' })
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`

    const payload = {
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text:
              'You are Cleo, the AI instructor for BourgeoisAI. Respond helpfully, concisely, and professionally about automation, education, and citizenship.',
          },
        ],
      },
      contents: [{ role: 'user', parts: [{ text: message }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    // ✅ Log to verify model output
    console.log('Gemini raw:', JSON.stringify(data, null, 2))

    // Safe text extraction across all Gemini formats
    let reply = 'Sorry, I couldn’t think of a response.'
    const part = data?.candidates?.[0]?.content?.parts?.[0]
    if (part)
      reply =
        part.text ||
        part.textContent ||
        part.stringValue ||
        part.value ||
        reply

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Gemini API error:', error)
    return res.status(500).json({ error: 'Gemini API request failed' })
  }
}
