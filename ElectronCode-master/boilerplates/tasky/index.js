const path = require('path')
const electron = require('electron');
const { app, BrowserWindow, Tray } = electron;

let mainWindow, tray;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    show: false,
    resizable: false,
    frame: false,
    height: 500,
    width: 300,
    webPreferences:{
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
  tray = new Tray(iconPath)
  tray.on('click', (event, bounds)=> {
    console.log(bounds)
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    }else{
      mainWindow.show();
    }
    
  })
});