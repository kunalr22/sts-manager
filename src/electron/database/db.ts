import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const dbURL = process.env.DATABASE_URL;
if (!dbURL) {
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}
const db = drizzle(dbURL);
if (!db) {
    throw new Error("Failed to initialize the database connection.");
}

console.log("Database connection established successfully.");

export { db };
