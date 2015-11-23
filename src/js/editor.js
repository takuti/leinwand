'use strict';

// Markdown editor using Vue.js and marked
import Vue from 'vue';
import marked from 'marked';
import fs from 'fs';
import remote from 'remote';
import ipc from 'ipc';

const editor = new Vue({
  el: '#editor',
  data: {
    input: '# hello',
    filename: null
  },
  filters: {
    marked: marked
  }
});

// open/save file
let openFile = null;

const dialog = remote.require('dialog');

function openFileDialog() {
  dialog.showOpenDialog(
    { 
      // only allow markdown
      filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }]
    }, 
    function (filenames) {
      var filename = filenames[0];
      if (filename) {
        fs.readFile(filename, 'utf8', function (err, data) {
          if (err) { throw err; }
          editor.$data.filename = filename;
          editor.$data.input = data;
          document.title = editor.$data.filename;
        });
      }
    }
  );
}

function saveFileDialog(callback) {
  function save(filename) {
    fs.writeFile(filename, editor.$data.input, function (err) {
      if (err) { throw err; }
    });
  }

  if (editor.$data.filename) {
    save(editor.$data.filename);
  } else {
    dialog.showSaveDialog(function (filename) {
      if (filename) {
        // save as markdown
        if (!/^.*\.(md|markdown)$/.test(filename)) {
          filename += '.md';
        }
        save(filename);
        
        editor.$data.filename = filename;
        document.title = editor.$data.filename;
        if (callback) callback();
      }
    });
  }
}

// emit event and open slideshow window
function playSlideshow () {
  if (!editor.$data.filename) {
    saveFileDialog(function () {
      ipc.send('open-slideshow-window', editor.$data.filename);
    });
  } else {
    ipc.send('open-slideshow-window', editor.$data.filename);
  }
}

const Menu = remote.require('menu');
Menu.setApplicationMenu(
  Menu.buildFromTemplate(
    [
      {
        label: 'Application',
        submenu: [
          {
            label: 'Quit',
            accelerator: 'Command+Q',
            selector: 'terminate:'
          }
        ]
      },
      {
        label: 'File',
        submenu: [
          {
            label: 'Open',
            accelerator: 'Command+O',
            click: openFileDialog
          },
          {
            label: 'Save',
            accelerator: 'Command+S',
            click: saveFileDialog
          }
        ]
      },
      {
        label: 'Edit',
        submenu: [
          {
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
          },
          {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
          },
          {
            type: 'separator'
          },
          {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
          },
          {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
          },
          {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
          },
          {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
          }
        ]
      },
      {
        label: 'View',
        submenu: [
          {
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click: function(item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.reload();
            }
          },
          {
            label: 'Toggle Full Screen',
            accelerator: (function() {
              if (process.platform == 'darwin')
                return 'Ctrl+Command+F';
              else
                return 'F11';
            })(),
            click: function(item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
            }
          },
          {
            label: 'Toggle Developer Tools',
            accelerator: (function() {
              if (process.platform == 'darwin')
                return 'Alt+Command+I';
              else
                return 'Ctrl+Shift+I';
            })(),
            click: function(item, focusedWindow) {
              if (focusedWindow)
                focusedWindow.toggleDevTools();
            }
          },
        ]
      },
      {
        label: 'Play',
        submenu: [
          {
            label: 'Play Slideshow',
            accelerator: 'Alt+Command+P',
            click: playSlideshow
          }
        ]
      }
    ]
  )
);