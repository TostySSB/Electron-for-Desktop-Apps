const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences:{
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(`file://${__dirname}/main.html`);
  mainWindow.on('closed', () => app.quit());
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

function createAddWindow(){
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    webPreferences:{
      nodeIntegration: true,
    },
      title: 'Add New Todo'
  });
  addWindow.loadURL(`file://${__dirname}/add.html`)
  addWindow.on('closed', ()=>{
    addWindow = null;
  })
}

ipcMain.on('todo:add', (event, todo) =>{
  mainWindow.webContents.send('todo:add', todo);
  addWindow.close()
})

const menuTemplate = [
  {
    label: "File",
    submenu: [
      { 
        label: "New Todo",
        click() {
          createAddWindow();
        } 
      },
      {
        label: 'Clear Todo\'s',
        click() {
          mainWindow.webContents.send('todo:clear');
        }
      },
      { 
        label: "Quit",
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Control + Q',
        click() {
          app.quit();
        }
      },
    ],
  },
];

if (process.platform === 'darwin'){
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== 'production'){
  menuTemplate.push({
    label: 'DEVELOPER',
    submenu: [
      {role: 'reload'},
      {
        label: 'Toggle Developer Tools',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        },
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Control + Shift + I',
      }
    ]
  })
}