import { create } from "zustand"

type AuthStore = {
    currentUser: string | null;
    signingUp: boolean;
    loggingIn: boolean;
    checkingAuthentication: boolean;

    checkCurrentUser: () => Promise<void>;
    register: (credentials: Credentials) => Promise<void>;
    login: (credentials: Credentials) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    currentUser: null,
    signingUp: false,
    loggingIn: false,
    checkingAuthentication: true,

    checkCurrentUser: async () => {
        const res = await window.electron.getCurrentUser();
        set({ currentUser: res.status ? res.data : null });
        set({ checkingAuthentication: false });
    },

    register: async (credentials: Credentials) => {
        set({ signingUp: true });
        try {
            const res = await window.electron.register(credentials);
            if (!res.status) {
                throw new Error(res.message);
            }
            console.log(res.message);
            // Add a toast later
            set({ signingUp: false });
        } catch(error) {
            console.error("Error during registration:", error);
            set({ signingUp: false });
            // Add a toast later
        }
    },

    login: async (credentials: Credentials) => {
        set({ loggingIn: true });
        try {
            const res = await window.electron.login(credentials);
            if (!res.status) {
                throw new Error(res.message);
            }
            console.log(res.message);
            set({ currentUser: res.data.username });
            set({ loggingIn: false });
            // Add a toast later
        } catch (error) {
            console.error("Error during login:", error);
            set({ loggingIn: false });
            // Add a toast later
        }
    },

    logout: () => {
        const res = window.electron.logout();
        if (!res.status) {
            console.error("Error during logout:", res.message);
            // Add a toast later
            return;
        }
        set({ currentUser: null });
    }


}));