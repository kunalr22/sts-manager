import { db } from './database/db.js';
import { sql } from 'drizzle-orm';
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { isDev } from './utils.js';
import { getPreloadPath } from './pathResolver.js';
import { login, logout, register, getCurrentUser } from './controllers/authController.js';

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

    ipcMain.handle("getDbName", async (): Promise<IpcResponse<string>> => {
        try {
            const res = await db.execute(sql`SELECT current_database()`);
            if (res.rows.length === 0) {
                return {
                    status: false,
                    data: "No database found",
                    message: "No database found. Please check your database url."
                }
            }
            return {
                status: true,
                data: res.rows[0].current_database as string,
                message: "Database name retrieved successfully."
            }
        } catch (error) {
            console.error("Error retrieving database name:", error);
            return {
                status: false,
                data: "",
                message: "Error retrieving database name: " + (error instanceof Error ? error.message : String(error))
            }
        }
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

    ipcMain.handle("getCurrentUser", () => {
        return getCurrentUser();
    })
});