import { CollectionFormValues } from "../collection";
import { CollectionDto } from "shared/types/collection";

export interface ICollectionAPIRepository {
  getCollections(): Promise<CollectionDto[]>;
  deleteCollection(id: string): Promise<void>;
  createCollection(collectionCreate: CollectionFormValues): Promise<void>
}

export const CollectionAPIRepositoryUID = Symbol("CollectionAPIRepository")