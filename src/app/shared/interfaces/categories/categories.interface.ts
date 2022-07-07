export interface ICategoriesRequest{
    name: string;
    path: string;
    imagePath: string;
}
export interface ICategoriesResponse extends ICategoriesRequest{
    id: number
}