export interface IProduct {
    Id: number;
    Title: string;
    BriefDescrition: string;
    DetailedDescription: string;
    IsActive: boolean;
    CategoryPageImage: string;
    DetailsPageImage: string;
    SMEId: number;
    MinimumCost: number;
    MaximumCost: number;
    LicensingTerms: string;
    ResourceRequirements: string;
    SellingPoints: string;
    ProductOfferingId: number[];
} 