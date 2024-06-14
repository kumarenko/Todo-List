interface List {
    id: number,
    name: string,
    items: Array<{
        id: number,
        name: string,
        added: boolean,
        details: string
    }|undefined>,
}
export const tempShoppingList: Array<List> = [
    {
        id: 0,
        name: 'Products',
        items: [{
            id: 1,
            name: 'Zucker',
            added: true,
            details: ''
        },{
            id: 2,
            name: 'Water',
            added: true,
            details: '2l'
        },{
            id: 3,
            name: 'Waffers',
            added: false,
            details: '1sht'
        }]
    },
    {
        id: 1,
        name: 'List #2',
        items: [],
    },
    {
        id: 2,
        name: 'List #3',
        items: [],
    },
];
export const allProducts = [{
    id: 1,
    name: 'Zucker',
    added: false,
    count: 0
},{
    id: 2,
    name: 'Water',
    added: false,
    count: 0
},{
    id: 3,
    name: 'Waffers',
    added: false,
    count: 0
},{
    id: 4,
    name: 'Bread',
    added: false,
    count: 0
},{
    id: 5,
    name: 'Salt',
    added: false,
    count: 0
},{
    id: 6,
    name: 'Beer',
    added: false,
    count: 0
},{
    id: 7,
    name: 'Cookies',
    added: false,
    count: 0
},{
    id: 8,
    name: 'Tomatoes',
    added: false,
    count: 0
},{
    id: 9,
    name: 'Cucumbers',
    added: false,
    count: 0
},{
    id: 10,
    name: 'Meat',
    added: false,
    count: 0
},{
    id: 11,
    name: 'Milk',
    added: false,
    count: 0
},{
    id: 12,
    name: 'Eggs',
    added: false,
    count: 0
},{
    id: 13,
    name: 'Soap',
    added: false,
    count: 0
},{
    id: 14,
    name: 'Pizza',
    added: false,
    count: 0
},{
    id: 15,
    name: 'Salad',
    added: false,
    count: 0
},{
    id: 16,
    name: 'Sweets',
    added: false,
    count: 0
},{
    id: 17,
    name: 'Sauce',
    added: false,
    count: 0
},{
    id: 18,
    name: 'Butter',
    added: false,
    count: 0
}]