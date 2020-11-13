const { app,BrowserWindow, BrowserWindowProxy } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let appWindow;

function crearVentana() {
    appWindow = new BrowserWindow({
        width: 1200,
        height: 1200,
        center: true,
        resizable: true,
        minWidth: 800,
        minHeight: 1000,
        show: false,
        icon: 'icon.png'
    });
    // 
    appWindow.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, "../build/index.html")}`
    );

    // cuando la app esta lista para verse
    appWindow.once('ready-to-show', () => {
        appWindow.show();
    });
}

app.on('ready', crearVentana);

app.on('window-all-closed', () =>{
    if(processs.plataform !== 'darwin'){
        app.quit();
    }
});
// config para MAC
app.on('activate',()=>{
    if(appWindow === null){
        crearVentana();
    }
})