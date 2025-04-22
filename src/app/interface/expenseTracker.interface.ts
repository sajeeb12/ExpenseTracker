export interface transaction{
    id:string,
    type:string,
    description:string,
    amount:number,
    category:string,
    date:string
}

export interface category{
    catId:string,
    catName:string
}

export interface Filter{
    category:string,
    date:string
}

export interface dropdownData{
    id:string | number,
    name?:string,
    value:string
}