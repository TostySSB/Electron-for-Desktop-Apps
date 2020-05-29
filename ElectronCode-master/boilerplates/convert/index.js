const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");
const { app, BrowserWindow, ipcMain } = electron;
const _ = require('lodash')

let mainWindow;

app.on("ready", () => {
  //app.dock.hide();
  mainWindow = new BrowserWindow({
    heigh: 600,
    width: 800,
    webPreferences: {
      backgroundThrottling: false,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  // const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  // const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
  // tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on("videos:added", (event, videos) => {
  // const promise = new Promise((resolve, reject) => {
  //   ffmpeg.ffprobe(videos[0].path, (err, metadata) => {
  //     resolve(metadata)
  //   });
  // });

  // promise.then((metadata) => {
  //   console.log(metadata)
  // })

  const promises = _.map(videos, video => {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(video.path, (err, metadata) => {
        resolve(metadata)
      })
    })
  })
  Promise.all(promises).then((results) => {
    console.log(results)
  })
});