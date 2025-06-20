import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: "./src/electron/database/schema.ts",
    out: "./src/electron/database/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    verbose: true,
    strict: true,
});