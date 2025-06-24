import bcrypt from "bcryptjs";
import { db } from "../database/db.js";
import { User } from "../database/schema.js";
import { eq } from "drizzle-orm";
import Store from "electron-store";

const store = new Store();

export const register = async (credentials: Credentials): Promise<IpcResponse<null>> => {
    try {
        if (store.get("currentUser")) {
            console.log("A user is already logged in. Please log out before registering a new user.");
            return {
                status: false,
                data: null,
                message: "A user is already logged in. Please log out before registering a new user."
            };
        }

        const { username, password } = credentials;
        const user = await db
                        .select()
                        .from(User)
                        .where(eq(User.username, username))
                        .limit(1);
        if (user.length > 0) {
            return {
                status: false,
                data: null,
                message: "This username already exists. Please try a different username."
            };
        }

        const hash = await bcrypt.hash(password, 10);
        await db.insert(User).values({
            username: username,
            password: hash,
            isAdmin: false,
        })
        return {
            status: true,
            data: null,
            message: "User \'" + username + "\' was created successfully."
        };
    } catch (error) {
        console.error("Error registering user:", error);
        return {
            status: false,
            data: null,
            message: "Error registering user: " + (error instanceof Error ? error.message : String(error))
        };
    }
}

export const login = async (credentials: Credentials): Promise<IpcResponse<UserResponse>> => {
    try {
        const { username, password } = credentials;
        const user = await db
                        .select()
                        .from(User)
                        .where(eq(User.username, username))
                        .limit(1);
        if (user.length === 0) {
            return {
                status: false,
                data: {
                    id: "",
                    username: "",
                },
                message: "Login failed. Please try again."
            };
        }
        const isValidPassword = await bcrypt.compare(password, user[0].password);
        if (!isValidPassword) {
            return {
                status: false,
                data: {
                    id: "",
                    username: "",
                },
                message: "Login failed. Please try again."
            };
        }

       store.set("currentUser", user[0].username);

        return {
            status: true,
            data: {
                id: user[0].id,
                username: user[0].username,
            },
            message: "Logged in successfully!"
        };
    } catch (error) {
        console.error("Error logging in user:", error);
        return {
            status: false,
            data: {
                id: "",
                username: "",
            },
            message: "Error logging in: " + (error instanceof Error ? error.message : String(error))
        }
    }
}

export const logout = (): IpcResponse<undefined> => {
    try {
        store.delete("currentUser");
        return {
            status: true,
            data: undefined,
            message: "Logged out successfully!"
        };
    } catch (error) {
        console.error("Error logging out user:", error);
        return {
            status: false,
            data: undefined,
            message: "Error logging out: " + (error instanceof Error ? error.message : String(error))
        };
    }
}

export const getCurrentUser = (): IpcResponse<string | undefined> => {
    try {
        const user = store.get("currentUser")
        if (!user) {
            return {
                status: false,
                data: undefined,
                message: "No user is logged in."
            }
        }
        return {
            status: true,
            data: user as string,
            message: "Successfully fetched current user."
        }
    } catch(error) {
        console.log("Error getting current user: " + error);
        return {
            status: false,
            data: undefined,
            message: "Error fetching current user: " + (error instanceof Error ? error.message : String(error))
        }
    }
}
    