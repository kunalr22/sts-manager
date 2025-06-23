type Credentials = {
    username: string;
    password: string;
}

type IpcResponse<T> = {
    status: boolean;
    data: T;
    message: string;
}

type UserResponse = {
    id: string,
    username: string
}

interface Window {
    electron: {
        getDbName: () => Promise<IpcResponse<string>>;
        register: (credentials: Credentials) => Promise<IpcResponse<UserResponse>>;
        login: (credentials: Credentials) => Promise<IpcResponse<UserResponse>>;
        logout: () => IpcResponse<undefined>;
        getCurrentUser: () => IpcResponse<string | undefined>;
    }
}