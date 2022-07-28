import { ICategoriesResponse } from "../categories/categories.interface";

export interface IProductsRequest {
    category: ICategoriesResponse;
    name: string;
    path: string;
    ingredients: string;
    weight: string;
    price: string;
    imagePath: string;
    count: number
}

export interface IProductsResponse extends IProductsRequest {
    id: number;
}