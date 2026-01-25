export interface LoginParams {
    username: string;
    password: string;
}

export interface RegisterParams {
    username: string;
    password: string;
    email: string;
    profileDescription: string;
}

export interface AuthResponse {
    token: string;
}

export interface BaseResponse {
    message: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface Prompt {
    category_id: number;
    title: string;
    description: string;
}

export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            credentials: 'include',
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

    async getCategories(): Promise<Category[]> {
        return this.request<Category[]>('/categories', {
            method: 'GET',
        });
    }

    async createPrompt(promptData: Prompt): Promise<BaseResponse> {
        return this.request<BaseResponse>('/prompts', {
            method: 'POST',
            body: JSON.stringify(promptData),
        });
    }

    async getPromptById(promptid: string | number): Promise<Prompt> {
        const id = encodeURIComponent(String(promptid));
        return this.request<Prompt>(`/prompts/${id}`, {
            method: 'GET',
        });
    }
}
//TODO: change after deploying
export const api = new ApiClient('http://localhost:3000');