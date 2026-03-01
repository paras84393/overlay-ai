import express from 'express'
import { generateAnswer } from '../services/ai.service.js'


const router = express.Router()

router.post('/ask', async (req, res) => {
  const { question } = req.body

  if (!question) {
    return res.status(400).json({ error: 'Question required' })
  }

  try {
    const answer = await generateAnswer(question)

    global.broadcastToOverlay({
      type: 'ANSWER',
      payload: answer
    })

    res.json({ success: true, answer })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'AI failed' })
  }
})

export default router
