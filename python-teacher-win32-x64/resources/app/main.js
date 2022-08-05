const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain } = require("electron/main");
const { ipcRenderer } = require("electron/renderer");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("dist/python-teacher/index.html");

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

ipcMain.handle("get-chapter", (event) => {
  return "pong";
});
app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
