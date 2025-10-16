import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Missing Gemini API key' })
  }

  try {
    const { message } = req.body
    if (!message) {
      return res.status(400).json({ error: 'Missing message text' })
    }

    // Updated endpoint: 1.5 flash (fast and stable)
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`

    const body = {
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text: 'You are Cleo, a friendly AI assistant for BourgeoisAI. Always respond clearly, helpfully, and professionally.',
          },
        ],
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      generationConfig: { temperature: 0.7, maxOutputTokens: 250 },
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    // Safe parsing — handles all Gemini reply shapes
    let reply = 'Sorry, I couldn’t think of a response.'
    const candidate = data?.candidates?.[0]
    if (candidate?.content?.parts?.length > 0) {
      const part = candidate.content.parts[0]
      reply =
        part?.text ||
        part?.textContent ||
        part?.stringValue ||
        reply
    }

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Gemini API Error:', error)
    return res.status(500).json({ error: 'Failed to fetch Gemini response' })
  }
}
