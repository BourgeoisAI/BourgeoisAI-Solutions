// ✅ Use stable Node runtime
export const config = {
  runtime: 'nodejs',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse JSON safely (Vercel sometimes passes raw string)
  let body = {};
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const message = body?.message || '';
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    console.error('❌ Missing GEMINI_API_KEY');
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
  }

  if (!message.trim()) {
    return res.status(400).json({ error: 'Empty message' });
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
    const payload = {
      systemInstruction: {
        role: 'system',
        parts: [
          {
            text:
              'You are Cleo, an intelligent and professional AI assistant for BourgeoisAI. Respond clearly, concisely, and kindly.',
          },
        ],
      },
      contents: [{ role: 'user', parts: [{ text: message }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // Log to inspect Gemini output
    console.log('Gemini raw:', JSON.stringify(data, null, 2));

    // Handle all response shapes
    let reply = 'Sorry, I couldn’t think of a response.';
    const part = data?.candidates?.[0]?.content?.parts?.[0];
    if (part)
      reply =
        part.text ||
        part.textContent ||
        part.stringValue ||
        part.value ||
        reply;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Gemini API request failed' });
  }
}
