import { CollectionFormValues } from "src/models/collection";
import { API } from "..";


export class CollectionAPIRepository extends API {
  public constructor () {
    super(null)
  }

  public async getCollections() {
    try {
      const response = await this.get<any>("/collection");
      return response.data
    } catch (error: unknown) {
      throw error
    }
  }

  public async deleteCollection(id: string) {
    try {
      const queryParams = new URLSearchParams({ id })
      await this.delete<any>(`/collection`, queryParams.toString())
    } catch(error: unknown) {
      throw error
    }
  }

  public async createCollection(collectionCreate: CollectionFormValues) {
    try {
      await this.post<CollectionFormValues, void>(`/collection`, collectionCreate)
    } catch(error: unknown) {
      throw error
    }
  }
}