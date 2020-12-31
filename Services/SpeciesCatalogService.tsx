export default class SpeciesCatalogService {
    public static async getById(id: string): Promise<IWikiCatalogItem> { };
    public static async searchTitle(search: string): Promise<IAutoCompleteResult[]>{};
}