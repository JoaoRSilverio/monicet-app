

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IWikiCatalogItem{
    title: string;
}

export interface IAutoCompleteResult{
    title: string;
    description: string;
    id: string;
}