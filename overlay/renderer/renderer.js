const closeBtn = document.getElementById('closeBtn')
const askBtn = document.getElementById('askBtn')

const answerBox = document.getElementById('answer')
const questionInput = document.getElementById('question')

/* ===============================
   BASIC CONTROLS
================================ */
closeBtn.onclick = () => window.close()
askBtn.onclick = () => ask()

// Auto focus on start
questionInput.focus()

// Enter = Ask (Shift+Enter for new line)
questionInput.addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    ask()
  }
})

/* ===============================
   TEXT → AI (MAIN FEATURE)
================================ */
async function ask() {
  const q = questionInput.value.trim()

  if (!q) {
    answerBox.textContent = 'Type a question first.'
    return
  }

  answerBox.textContent = 'Thinking…'

  try {
    const res = await fetch('http://localhost:3000/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q })
    })

    const data = await res.json()
    answerBox.textContent = data.answer
  } catch {
    answerBox.textContent = 'Backend not reachable.'
  }
}

/* ===============================
   PANIC / HIDE MODE
   Ctrl + Shift + H
================================ */
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "h") {
    document.body.style.opacity =
      document.body.style.opacity === "0.05" ? "1" : "0.05"
  }
})
const { ipcRenderer } = require('electron')

const dragBar = document.querySelector('.drag-bar')

dragBar.addEventListener('mousedown', () => {
  ipcRenderer.send('start-window-drag')
})
