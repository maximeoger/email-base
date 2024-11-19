export interface ICollectionAPIRepository {
  getCollections(): Promise<any>;
  deleteCollection(id: string): Promise<void>;
}

export const CollectionAPIRepositoryUID = Symbol("CollectionAPIRepository")