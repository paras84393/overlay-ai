import fetch from 'node-fetch'

export async function generateAnswer(question) {
  const res = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        max_tokens: 150,
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content: `
You are a senior software engineer helping in live interviews.

Rules:
- Keep answers short and professional
- Prefer bullet points
- Avoid long explanations
- No emojis
- End with 2–3 likely follow-up questions
`
          },
          {
            role: 'user',
            content: question
          }
        ]
      })
    }
  )

  const data = await res.json()

  if (!res.ok) {
    console.error('Groq API Error:', data)
    throw new Error(data.error?.message || 'Groq API failed')
  }

  if (!data.choices || !data.choices.length) {
    throw new Error('No choices returned from Groq')
  }

  return data.choices[0].message.content?.trim()
    || 'No answer generated. Please rephrase.'
}
