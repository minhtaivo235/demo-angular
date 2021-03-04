export interface Product {
    id?: number,
    categoryId: number,
    name: string,
    price: number,
    expDate: Date,
    createAt?: Date,
    createBy: string
}
