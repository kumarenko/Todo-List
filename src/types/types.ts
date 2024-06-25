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

}
export interface Login {
    isAuthorized: boolean,
    user: User,
    errorMessage: string,
    successMessage: string,
}
export interface SettingsTypes {
    theme: string
}

