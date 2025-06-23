import { db } from './database/db.js';
import { sql } from 'drizzle-orm';
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './utils.js';
import { getPreloadPath } from './pathResolver.js';
import { login, logout, register } from './controllers/authController.js';

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        mainWindow.loadURL("http://localhost:" + (process.env.VITE_PORT));
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }

    ipcMain.handle("getDbName", async () => {
        const res = await db.execute(sql`SELECT current_database()`);
        return res.rows[0].current_database;
    })

    ipcMain.handle("register", (event, credentials: Credentials) => {
        return register(credentials);
    })

    ipcMain.handle("login", (event, credentials: Credentials) => {
        return login(credentials);
    })

    ipcMain.handle("logout", () => {
        return logout();
    })
});