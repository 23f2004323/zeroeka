require('dotenv').config();
const Groq = require('groq-sdk');

async function testGroq() {
  console.log('GROQ_API_KEY exists:', !!process.env.GROQ_API_KEY);
  console.log('GROQ_API_KEY:', process.env.GROQ_API_KEY);
  
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Say 'Hello from Groq!'" }],
      model: "llama-3.3-70b-versatile",
    });
    console.log(' SUCCESS:', chatCompletion.choices[0]?.message?.content);
  } catch (err) {
    console.log(' ERROR:', err.message);
  }
}

testGroq();