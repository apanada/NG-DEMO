export interface IBusinessNeed {
    Id: number;
    Title: string;
    BriefDescription: string;
    DetailedDescription: string;
    IsActive: boolean;
    CategoryId: number;
    AssociatedTriggersId: number[];
    PrimaryAssociatedProducts: number[];
    SecondaryAssociatedProducts: number[];
}