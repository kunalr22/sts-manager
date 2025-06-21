import dotenv from "dotenv";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { getEnvPath } from "../pathResolver.js";

let db: NodePgDatabase;

dotenv.config({
    path: getEnvPath(),
});

const dbURL = process.env.DATABASE_URL;
if (!dbURL)
    console.log("DATABASE_URL is not defined in the environment variables.");
else {
    db = drizzle(dbURL);
    if (!db)
        console.log("Failed to initialize the database connection.");
    else
        console.log("Database connection established successfully.");
}

export { db };

