type Credentials = {
    username: string;
    password: string;
}

interface Window {
    electron: {
        getDbName: () => Promise<string>;
        register: (credentials: Credentials) => void;
    }
}