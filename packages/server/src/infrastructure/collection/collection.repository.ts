/*
import BaseRepository from "src/core/repository/base-repository";
import { Tables, TablesInsert, TablesUpdate } from '../../../../shared/types';

type CollectionRow = Tables<"collection">
type CollectionInsert = TablesInsert<"collection">
type CollectionUpdate = TablesUpdate<"collection">

class CollectionRepository extends BaseRepository<CollectionRow, CollectionInsert, CollectionUpdate> {
  
  static init (dbClient: any) {
    return new CollectionRepository(dbClient, "collection")
  }
}

export default CollectionRepository
*/