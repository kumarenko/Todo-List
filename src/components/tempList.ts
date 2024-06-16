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