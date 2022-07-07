export interface IActionsRequest {
    name: string;
    title: string;
    description: string;
    imagePath: string;
}

export interface IActionsResponse extends IActionsRequest {
    id: number;
}