import { WebSocketServer } from 'ws'

let clients = []

export default function initSocket(server) {
  const wss = new WebSocketServer({ server })

  wss.on('connection', (ws) => {
    console.log('🟢 Overlay connected')
    clients.push(ws)

    ws.on('close', () => {
      clients = clients.filter(c => c !== ws)
      console.log('🔴 Overlay disconnected')
    })
  })

  global.broadcastToOverlay = (data) => {
    clients.forEach(ws => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(data))
      }
    })
  }
}
