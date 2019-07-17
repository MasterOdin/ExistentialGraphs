const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win;

function createWindow() {
	win = new BrowserWindow({width: 1080, height: 720});
	
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'Initial_Mockup/index.html'),
		protocol: 'file:',
		slashes: true
	}));
	
	//Open developer tools
	//win.webContents.openDevTools();
	
	win.on('closed', () => {
		win = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});