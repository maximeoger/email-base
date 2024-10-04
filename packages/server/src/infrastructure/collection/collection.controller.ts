import { Body, Controller, Get, Post } from '@nestjs/common';
import { CollectionService } from './collection.service';
import CreateCollectionDto from 'src/dto/collection/create.dto';

@Controller('collection')
export class CollectionController {
  constructor (private readonly collectionService: CollectionService){}

  @Get()
  getCollections(): Promise<any[]> {
    return this.collectionService.getCollections({})
  }

  @Post()
  createCollection(@Body() collection: CreateCollectionDto): Promise<any> {
    return this.collectionService.createCollection(collection)
  }
}