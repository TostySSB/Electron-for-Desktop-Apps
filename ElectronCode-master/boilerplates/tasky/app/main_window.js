const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow{
  constructor(url){
    super({
      show: false,
      resizable: false,
      frame: false,
      height: 500,
      width: 300,
      skipTaskbar: true,
      webPreferences:{
        nodeIntegration: true,
        backgroundThrottling: false
      },
    });
    this.loadURL(url);
    this.on('blur', this.onBlur.bind(this));
  }

  
  onBlur(){
    this.hide();
  }
}

module.exports = MainWindow;