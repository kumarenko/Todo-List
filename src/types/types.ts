export interface ShoppingList {
    _id: string;
    id: number;
    name: string;
    items: ShoppingList[];
}

export interface ShoppingListsResponse {
    lists: ShoppingList[];
    products: ShoppingList[]
}

export interface Login {
    isAuthorized: boolean,
    user: {
        role: 'GUEST' | 'USER',
        userId: number | null,
        name: string,
        surname: string,
        email: string,
    },
    errorMessage: string,
}
export interface SettingsTypes {
    theme: string
}
