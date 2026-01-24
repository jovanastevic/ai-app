interface LoginParams {
    username: string;
    password: string;
}

interface RegisterParams {
    username: string;
    password: string;
    email: string;
    profileDescription: string;
}

interface AuthResponse {
    token: string;
}

interface BaseResponse {
    message: string;
}

export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        // const data = await response.json();

        const text = await response.text();

        //register sends empty response body, triggers error - workaround
        const data = text ? JSON.parse(text) : {};

        if (!response.ok) {
            throw new Error(data.message || 'Ein Fehler ist aufgetreten');
        }

        return data as T;
    }

    async login(credentials: LoginParams): Promise<AuthResponse> {
        return this.request<AuthResponse>('/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async register(credentials: RegisterParams): Promise<BaseResponse> {
        return this.request<BaseResponse>('/user', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async logout(): Promise<BaseResponse> {
        return this.request<BaseResponse>('/logout', {
            method: 'POST',
        });
    }
}

export const api = new ApiClient('http://localhost:3000');