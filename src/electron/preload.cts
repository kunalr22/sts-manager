import type * as Electron from "electron";

const electron = require("electron") as typeof Electron;

electron.contextBridge.exposeInMainWorld("electron", {
    
})