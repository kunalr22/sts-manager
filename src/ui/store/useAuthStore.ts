import { create } from "zustand"

export const useAuthStore = create((set, get) => ({
    currentUser: null,
    signingUp: false,
    loggingIn: false,
    checkingAuthentication: true,

    checkCurrentUser: async () => {
        const res = await window.electron.getCurrentUser();
        set({ currentUser: res.status ? res.data : null });
        set({ checkingAuthentication: false });
    }
}));