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
    googleId: string | null
}
export interface Login {
    isAuthorized: boolean,
    loading: boolean,
    user: User,
    errorMessage: string,
    successMessage: string,
}
export interface SettingsTypes {
    theme: string,
    units: string,
    currency: string,
    isMetric: boolean,
}