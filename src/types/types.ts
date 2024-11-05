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
export type ProductCategory =
    'FRUITS' | 'VEGETABLES' |
    'DAIRY' | 'MEAT' |
    'BAKERY' | 'OTHER' |
    'SWEETS' | 'SPICES' |
    'CHEMISTRY' | 'ALCOHOL' |
    'MILKS' | 'CANNED'
    | 'CEREALS' |
    'CHILDREN' |
    'CLOTHES' | 'COFFEE' | 'DRINKS' | 'FROZEN' | 'HOUSE' | 'KITCHEN' |
    'OILS' | 'PETS' | 'READY' | 'SEAFOOD' | 'SAUCES' | 'STARTER' |
    'STATIONERY' | 'TOOLS';

export const ProductCategories: ProductCategory[] = [
    'FRUITS',
    'VEGETABLES',
    'DAIRY',
    'MEAT',
    'BAKERY',
    'OTHER','SWEETS',
    'SPICES', 'MILKS',
    'CHEMISTRY', 'ALCOHOL',
    'CANNED', 'CEREALS',
    'CHILDREN','CLOTHES','COFFEE', 'DRINKS',
    'FROZEN', 'HOUSE', 'KITCHEN',
    'OILS','PETS','READY', 'SEAFOOD',
    'SAUCES', 'STARTER', 'STATIONERY','TOOLS'
];
