import type * as Electron from "electron";

const electron = require("electron") as typeof Electron;

electron.contextBridge.exposeInMainWorld("electron", {
    getDbName: () => electron.ipcRenderer.invoke("getDbName"),
    register: (credentials: Credentials) => electron.ipcRenderer.invoke("register", credentials),
    login: (credentials: Credentials) => electron.ipcRenderer.invoke("login", credentials),
    logout: () => electron.ipcRenderer.invoke("logout"),
    getCurrentUser: () => electron.ipcRenderer.invoke("getCurrentUser"),
});