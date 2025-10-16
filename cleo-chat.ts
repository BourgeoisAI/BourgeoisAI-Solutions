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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
        }),
      }
    )

    const data = await response.json()
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, I could not generate a response.'

    res.status(200).json({ reply })
  } catch (err) {
    console.error('Gemini API Error:', err)
    res.status(500).json({ error: 'Failed to fetch response from Gemini' })
  }
}
