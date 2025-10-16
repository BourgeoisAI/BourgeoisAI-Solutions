

🧠 BourgeoisAI – Cleo AI Chat & Automation Hub

BourgeoisAI delivers intelligent education, workflow automation, and consulting solutions that bridge AI technology and real-world business outcomes.
This repository hosts the production Cleo chatbot system — a Gemini-powered AI assistant securely deployed on Vercel.
✨ Features

Feature	Description
💬 Cleo Chat Assistant	Conversational AI using Google Gemini with safe serverless routing
🔐 Secure API	Gemini key stored in Vercel Environment Variables — never exposed to the browser
⚡ Serverless	Built entirely on Vercel Edge Functions (api/cleo-chat.ts)
🧩 Single-Page Frontend	index.html contains a minimal floating chat bubble UI
💾 Session Memory	Chat persists in localStorage for returning visitors
🪙 Donation System	Optional Stripe $1 donation form (editable)
🧱 Zero Cost Tier	Works inside Gemini Free Tier — no external hosting or backend bills


⸻

🗂 Project Structure

/
├── api/
│   └── cleo-chat.ts        # Serverless Gemini API route
├── index.html              # Frontend with Cleo chat bubble
├── vercel.json             # SPA routing configuration
└── package.json            # Minimal dependencies


⸻

⚙️ Local Development

# 1. Clone repository
git clone https://github.com/<your-username>/bourgeoisai-cleochat.git
cd bourgeoisai-cleochat

# 2. Install (for local testing)
npm install

# 3. Add environment variable
echo "GEMINI_API_KEY=your_gemini_key_here" >> .env

# 4. Run Vercel dev server
vercel dev

Then open → http://localhost:3000

⸻

🚀 Deployment on Vercel
	1.	Push this repo to GitHub.
	2.	Import it into Vercel.
	3.	In Project → Settings → Environment Variables, add:

Name: GEMINI_API_KEY
Value: your-real-gemini-key
Environments: Production, Preview


	4.	Click Redeploy.

Your live Cleo chat will be available immediately under
https://bourgeoisai.com or https://bourgeoisai.io (as configured).

⸻

🧩 API Reference

Endpoint: POST /api/cleo-chat

Parameter	Type	Description
message	string	User’s text input

Response:

{ "reply": "AI generated text" }

If the Gemini service fails or exceeds quota, the client automatically falls back to local preset Cleo messages.

⸻

🔐 Security Notes
	•	The Gemini API key is stored only on Vercel servers.
	•	CORS and method checks protect against abuse.
	•	LocalStorage limits conversation history to 20 messages per session.
	•	No user data is logged or persisted beyond the session.

⸻

💡 Customization
	•	Brand Text & Colors: edit CSS variables in <style> at the top of index.html.
	•	Fallback Responses: update the fallbackReplies array inside the script.
	•	Donation Link: replace the Stripe URL with your own product link.
	•	Add Pages: duplicate index.html and adjust vercel.json rewrites.

⸻

🧭 Roadmap
	•	Add rate-limiting (1 req/sec)
	•	Add streaming Gemini responses
	•	Add multilingual Cleo modes (EN/ES)
	•	Integrate analytics via Google Tag Manager
	•	Expand to BourgeoisAI Classroom + OneHourCitizenship subdomains

⸻

📧 Contact

Email: hello@bourgeoisai.com
Web: https://bourgeoisai.com
Brand: © 2025 BourgeoisAI Solutions — All Rights Reserved
