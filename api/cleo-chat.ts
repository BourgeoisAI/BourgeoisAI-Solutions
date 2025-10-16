export const config = {
  runtime: 'edge',
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing GEMINI_API_KEY' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { message } = await req.json()

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`

    const body = {
      contents: [{ role: 'user', parts: [{ text: message }] }],
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    // 🧠 Flexible extraction for all Gemini response formats
    let reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content?.parts?.[0]?.stringValue ||
      data?.candidates?.[0]?.content?.parts?.[0]?.textContent ||
      data?.candidates?.[0]?.content?.parts?.[0]?.value ||
      'Sorry, I couldn’t think of a response.'

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Gemini API error:', error)
    return new Response(JSON.stringify({ reply: 'Gemini API error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
