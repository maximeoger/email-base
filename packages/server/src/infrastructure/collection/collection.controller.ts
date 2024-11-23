import { Body, Controller, Get, Logger, Delete, Post, Req, UseGuards, UseInterceptors, Patch, Param, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { CollectionService } from './collection.service';
import CreateCollectionDto from 'src/dto/collection/create.dto';
import AuthGuard from '../auth/auth.guard';
import { Request } from 'express';
import AuthInterceptor from '../auth/auth.interceptor';
import UpdateCollectionDto from 'src/dto/collection/update.dto';

@Controller('collection')
@UseGuards(AuthGuard)
@UseInterceptors(AuthInterceptor)
export class CollectionController {

  private readonly logger = new Logger(CollectionController.name)

  constructor (
    private readonly collectionService: CollectionService,
  ){}

  @Get()
  async getCollections(@Req() request: Request): Promise<any[]> {
    return await this.collectionService.getCollections({
      where: {
        // @ts-ignore
        user_id: request.session.users.id
      }
    })
  }

  @Post()
  async createCollection(@Body() collection: CreateCollectionDto, @Req() request: Request): Promise<any> {
    //@ts-ignore
    return await this.collectionService.createCollection(collection, request.session)
  }

  @Delete()
  @HttpCode(204)
  async deleteCollection(
    @Query("id") id: string
  ): Promise<void> {
    return await this.collectionService.deleteCollection({ 
      where: {
        id: Number(id)
      } 
    })
  }

  @Patch()
  @HttpCode(200)
  async updateCollection(@Query("id") id: string, @Body() collectionUpdate: UpdateCollectionDto): Promise<any> {
    return await this.collectionService.updateCollection(collectionUpdate, {
      where: {
        id: Number(id)
      }
    })
  }
}