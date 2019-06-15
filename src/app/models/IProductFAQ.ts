export interface IProductFA {
    Id: number;
    Title: string;
    Answer: string;
    ItemOrder: number;
    IsActive: boolean;
    Type: FAQType;
    ProductId: number;
}

export enum FAQType {
    Deliverable, SellingPoints, Misc
}