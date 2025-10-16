<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>BourgeoisAI | AI Automation & Consulting</title>
  <meta name="description" content="Learn, automate, and grow with BourgeoisAI — AI consulting, intelligent training, and automation for businesses and learners." />
  <style>
    body { margin:0; font-family:Inter,system-ui,sans-serif; background:#0d1222; color:white; line-height:1.6; }
    header { text-align:center; padding:60px 20px 30px; background:linear-gradient(135deg,#6366f1,#8b5cf6); }
    header h1 { margin:0; font-size:2.8rem; }
    main { max-width:960px; margin:auto; padding:40px 20px; }
    a.button, button { background:#8b5cf6; color:white; border:none; border-radius:6px; padding:12px 24px; text-decoration:none; font-weight:600; }
    footer { text-align:center; padding:30px 20px; border-top:1px solid #1f2937; color:#9ca3af; }
    #chat-bubble { position:fixed; bottom:20px; right:20px; width:60px; height:60px; border-radius:50%; background:#8b5cf6; display:flex; align-items:center; justify-content:center; font-size:26px; box-shadow:0 4px 12px rgba(0,0,0,0.3); cursor:pointer; transition:.2s; z-index:9999;}
    #chat-bubble:hover { transform:scale(1.1);}
    #chat-container { display:none; position:fixed; bottom:90px; right:20px; width:320px; background:#111827; border:1px solid #374151; border-radius:10px; padding:12px; box-shadow:0 4px 20px rgba(0,0,0,0.4); z-index:9999;}
    #chat-window { background:#111827; height:250px; overflow-y:auto; padding:8px; border-radius:6px; border:1px solid #374151; margin-bottom:8px; font-size:14px; color:white;}
    #chat-form { display:flex; gap:6px;}
    #user-input { flex:1; padding:8px; border-radius:6px; border:1px solid #374151; background:#1f2937; color:white;}
    #chat-form button { padding:8px 14px; border:none; border-radius:6px; background:#8b5cf6; color:white; cursor:pointer;}
  </style>
</head>
<body>
  <header>
    <h1>BourgeoisAI Solutions</h1>
    <p>AI Automation • Consulting • Intelligent Learning</p>
  </header>

  <main>
    <section style="text-align:center">
      <p>BourgeoisAI builds intelligent systems that accelerate learning and automate workflows.
      Explore AI-powered teaching, automation consulting, and data-driven solutions.</p>
      <a href="https://bourgeoisai.com" class="button">Visit BourgeoisAI.com</a>
    </section>

    <section style="margin-top:50px;text-align:center">
      <h2>💬 Chat with Cleo</h2>
      <p>Ask Cleo about BourgeoisAI, our services, or the Citizenship Course.</p>
    </section>
  </main>

  <footer>© 2025 BourgeoisAI Solutions • <a href="https://bourgeoisai.com" style="color:#8b5cf6;">bourgeoisai.com</a></footer>

  <div id="chat-bubble">💬</div>
  <div id="chat-container">
    <div id="chat-window">
      <p><strong>Cleo:</strong> Hi! I’m Cleo — your AI assistant from BourgeoisAI. Ask me anything!</p>
    </div>
    <form id="chat-form">
      <input type="text" id="user-input" placeholder="Type your message..." />
      <button type="submit">➤</button>
    </form>
  </div>

  <script>
    const bubble=document.getElementById('chat-bubble');
    const container=document.getElementById('chat-container');
    const form=document.getElementById('chat-form');
    const input=document.getElementById('user-input');
    const chat=document.getElementById('chat-window');

    const saved=JSON.parse(localStorage.getItem('cleoChat')||'[]');
    saved.forEach(m=>appendMessage(m.sender,m.text));

    bubble.addEventListener('click',()=>{container.style.display=container.style.display==='none'?'block':'none';});

    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const text=input.value.trim();
      if(!text)return;
      appendMessage('You',text);save('You',text);
      input.value='';
      try{
        const res=await fetch('/api/cleo-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:text})});
        const data=await res.json();
        const reply=data.reply||"Sorry, I couldn’t think of a response.";
        appendMessage('Cleo',reply);save('Cleo',reply);
      }catch{
        const fallback="I’m Cleo from BourgeoisAI — visit bourgeoisai.com for more!";
        appendMessage('Cleo',fallback);save('Cleo',fallback);
      }
    });

    function appendMessage(sender,msg){
      const p=document.createElement('p');
      p.innerHTML=`<strong>${sender}:</strong> ${msg}`;
      chat.appendChild(p);chat.scrollTop=chat.scrollHeight;
    }
    function save(sender,text){
      const h=JSON.parse(localStorage.getItem('cleoChat')||'[]');
      h.push({sender,text});if(h.length>20)h.shift();
      localStorage.setItem('cleoChat',JSON.stringify(h));
    }
  </script>
</body>
</html>
