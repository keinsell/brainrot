import { SessionOptions } from "iron-session";

export interface SessionData {
    username: string;
    isLoggedIn: boolean;
    counter: number;
}

export const defaultSession: SessionData = {
    username: "",
    isLoggedIn: false,
    counter: 0,
};

export const sessionOptions: SessionOptions = {
    password: "complex_password_at_least_32_characters_long",
    cookieName: "fwa-session",
    cookieOptions: {
        secure: true,
    },
};

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}