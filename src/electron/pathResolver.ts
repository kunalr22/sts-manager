import path from 'path';
import { app } from 'electron';
import { isDev } from './utils.js';

export function getPreloadPath(): string {
    return path.join(
        app.getAppPath(),
        isDev() ? "." : "..",
        "/dist-electron/preload.cjs"
    );
}

export function getEnvPath(): string {
    return path.join(
        app.getAppPath(),
        isDev() ? ".env" : "../.env"
    )
    
}
