interface List {
    id: number,
    name: string,
    status: 'PROGRESS' | 'DONE',
    description: string,
}
export const tempList: Array<List> = [
    {
        id: 0,
        name: 'sdfsdf',
        status: 'PROGRESS',
        description: '',
    },
    {
        id: 1,
        name: 'qqqq',
        status: 'DONE',
        description: 'description',
    },
    {
        id: 2,
        name: 'wwwwwww',
        status: 'PROGRESS',
        description: 'description2',
    },
];
