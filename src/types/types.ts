export interface ShoppingList {
    _id: string;
    id: number;
    name: string;
    items: ShoppingList[];
}

export interface User {
    role: 'GUEST' | 'USER',
    id: string,
    name: string,
    lastName: string,
    email: string,
    avatar: string | null,
    googleId: string | null,
    country: string,
}
export interface Login {
    isAuthorized: boolean,
    loading: boolean,
    user: User,
}
export interface SettingsTypes {
    theme: string,
    language: string,
    messagesQueue: Array<{createdAt: Date, value: string}>
}