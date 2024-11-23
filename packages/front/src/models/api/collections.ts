import { CollectionFormValues } from "../collection";

export interface ICollectionAPIRepository {
  getCollections(): Promise<any>;
  deleteCollection(id: string): Promise<void>;
  createCollection(collectionCreate: CollectionFormValues): Promise<void>
}

export const CollectionAPIRepositoryUID = Symbol("CollectionAPIRepository")