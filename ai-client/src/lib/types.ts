export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface PromptPost {
    id: number;
    title: string;
    description: string;
    category: string;
    time: string;
    owner: string;
}