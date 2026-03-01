const { app, BrowserWindow } = require('electron')


let win

app.whenReady().then(() => {
  win = new BrowserWindow({
    width: 700,
    height: 420,
    minWidth: 500,
    minHeight: 300,
    transparent:true,
    frame: false,
    resizable: true,     // resize allowed
    movable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: true,

    webPreferences: {
      preload: __dirname + '/preload.js',
          contextIsolation: false,   // ❗ IMPORTANT
      nodeIntegration: true
    }
  })

  win.loadFile('./renderer/index.html')
})
