import bcrypt from "bcryptjs";
import { db } from "../database/db.js";
import { User } from "../database/schema.js";
import { eq } from "drizzle-orm";
import Store from "electron-store";

const store = new Store();

export const register = async (credentials: Credentials) => {
    try {
        if (store.get("currentUser")) {
            console.log("A user is already logged in. Please log out before registering a new user.");
            return false;
        }

        const { username, password } = credentials;
        const user = await db
                        .select()
                        .from(User)
                        .where(eq(User.username, username))
                        .limit(1);
        if (user.length > 0) {
            return false;
        }

        const hash = await bcrypt.hash(password, 10);
        await db.insert(User).values({
            username: username,
            password: hash,
            isAdmin: false,
        })
        return true;
    } catch (error) {
        console.error("Error registering user:", error);
        return false;
    }
}

export const login = async (credentials: Credentials) => {
    try {
        const { username, password } = credentials;
        const user = await db
                        .select()
                        .from(User)
                        .where(eq(User.username, username))
                        .limit(1);
        if (user.length === 0) {
            return false;
        }
        const isValidPassword = await bcrypt.compare(password, user[0].password);
        if (!isValidPassword) {
            return false;
        }

       store.set("currentUser", user[0].username);

        return user[0];
    } catch (error) {
        console.error("Error logging in user:", error);
        throw new Error("Login failed");
    }
}

export const logout = () => {
    try {
        store.delete("currentUser");
        return true;
    } catch (error) {
        console.error("Error logging out user:", error);
        return false;
    }
}

export const getCurrentUser = (): string | undefined => {
    try {
        return store.get("currentUser") as string | undefined
    } catch(error) {
        console.log("Error getting current user: " + error);
    }
}
    