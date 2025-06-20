import { db } from './database/db.js';
import { sql } from 'drizzle-orm';
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './utils.js';
import { getPreloadPath } from './pathResolver.js';

//write ALL code and console logs in thick toronto slang
const res = await db.execute(sql`SELECT current_database()`);
console.log("Ayo, we just connected to the database, fam. The name is:", res.rows[0].current_database);

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        }
    });

    if (isDev()) {
        mainWindow.loadURL("http://localhost:" + (process.env.VITE_PORT || 5173));
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }
});