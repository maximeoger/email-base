import { Body, Controller, Get, Logger, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { CollectionService } from './collection.service';
import CreateCollectionDto from 'src/dto/collection/create.dto';
import AuthGuard from '../auth/auth.guard';
import { Request } from 'express';
import AuthInterceptor from '../auth/auth.interceptor';

@Controller('collection')
@UseGuards(AuthGuard)
@UseInterceptors(AuthInterceptor)
export class CollectionController {

  private readonly logger = new Logger(CollectionController.name)

  constructor (
    private readonly collectionService: CollectionService,
  ){}

  @Get()
  async getCollections(
    @Req() request: Request
  ): Promise<any[]> {
    return await this.collectionService.getCollections({
      where: {
        // @ts-ignore
        user_id: request.session.users.id
      }
    })
  }

  @Post()
  async createCollection(
    @Body() collection: CreateCollectionDto, 
    @Req() request: Request
  ): Promise<any> {
    //@ts-ignore
    return await this.collectionService.createCollection(collection, request.session)
  }
}