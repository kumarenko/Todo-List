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
    gender: 'MALE' | 'FEMALE',
    birthday: Date,

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
export type ProductCategory =
    'FRUITS' | 'VEGETABLES' |
    'DAIRY' | 'MEAT' |
    'BAKERY' | 'OTHER' |
    'SWEETS' | 'SPICES' |
    'CHEMISTRY' | 'ALCOHOL' |
    'MILKS';

export const ProductCategories: ProductCategory[] = [
    'FRUITS',
    'VEGETABLES',
    'DAIRY',
    'MEAT',
    'BAKERY',
    'OTHER','SWEETS',
    'SPICES', 'MILKS',
    'CHEMISTRY', 'ALCOHOL'
];
