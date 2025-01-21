import { CollectionFormValues } from "../collection";
import { CollectionDto, UpdateCollectionDto } from "shared/types/collection";

export interface ICollectionAPIRepository {
  getCollections(): Promise<CollectionDto[]>;
  deleteCollection(id: string): Promise<void>;
  createCollection(body: CollectionFormValues): Promise<void>;
  updateCollection(body: UpdateCollectionDto, id: number): Promise<void>;
}

export const CollectionAPIRepositoryUID = Symbol("CollectionAPIRepository");
