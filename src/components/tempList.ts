interface List {
    id: number,
    name: string,
    items: Array<{
        id: number,
        name: string,
        status: string,
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
            status: 'DONE',
            details: '1kg'
        },{
            id: 2,
            name: 'Water',
            status: 'DONE',
            details: '2l'
        },{
            id: 3,
            name: 'Waffers',
            status: 'PROGRESS',
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
