'use strict';

import app from 'app';
import BrowserWindow from 'browser-window';
import globalShortcut from 'global-shortcut';
import ipc from 'ipc';

var mainWindow = null;
var slideshowWindow = null;

app.on('wildow-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600,
    flame: false
  });
  mainWindow.loadUrl('file://' + __dirname + '/../editor.html');

  // mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

ipc.on('open-slideshow-window', function (e, mdFilePath) {
  if (slideshowWindow) { return; }

  slideshowWindow = new BrowserWindow({
    width: 800,
    height: 600,
    flame: false
  });
  
  slideshowWindow.loadUrl('file://' + __dirname + '/../slideshow.html');

  var webContents = slideshowWindow.webContents;
  webContents.on('did-finish-load', function () {
    webContents.send('load-revealjs', mdFilePath);
  });

  slideshowWindow.on('closed', function () {
    slideshowWindow = null;
  });
});