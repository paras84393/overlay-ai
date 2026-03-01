import 'dotenv/config'
import express from 'express'
import http from 'http'
import cors from 'cors'

// internal imports
import questionRoutes from './src/routes/question.routes.js'
import initSocket from './src/sockets/overlay.socket.js'

const app = express()
const server = http.createServer(app)

// middleware
app.use(cors())
app.use(express.json())

// routes
app.use('/api', questionRoutes)

// websocket
initSocket(server)

// health
app.get('/health', (req, res) => {
  res.send('✅ Backend running')
})

// start
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`)
})
