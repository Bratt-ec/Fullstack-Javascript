const { app,BrowserWindow } = require('electron');
let appWindow;

function crearVentana() {
    appWindow = new BrowserWindow({
        width: 1080,
        height: 1080,
        minWidth: 800,
        minHeight: 900,
        center: true,
        show: false,
        icon: 'icon.png'

    });
    // cuando la app es cerrada
    appWindow.on('closed', () =>{
        appWindow =  null;
    });
    // cargar html
    appWindow.loadFile('./index.html');
    // cuando esta lista
    appWindow.once('ready-to-show', () =>{
        appWindow.show();
    });
}

app.on('ready', crearVentana);