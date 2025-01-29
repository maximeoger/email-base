import {
  Body,
  Controller,
  Get,
  Delete,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  Patch,
  Query,
  HttpCode,
  Param,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import {
  CreateCollectionDto,
  CollectionDto,
  UpdateCollectionDto,
} from 'shared/types/collection';
import AuthGuard from '../auth/auth.guard';
import { Request } from 'express';
import AuthInterceptor from '../auth/auth.interceptor';

@Controller('api/collection')
@UseGuards(AuthGuard)
@UseInterceptors(AuthInterceptor)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  async getCollections(@Req() request: Request): Promise<CollectionDto[]> {
    const collections = await this.collectionService.getCollections(
      request.user.id,
    );
    return collections.map((collection: any) => {
      const dto = new CollectionDto();
      dto.id = Number(collection.id);
      dto.createdAt = collection.created_at || '';
      dto.updatedAt = collection.updated_at || '';
      dto.description = collection.description;
      dto.name = collection.name;
      dto.emailIds = collection.emailIds;
      dto.screenshots = collection.screenshots;
      return dto;
    });
  }

  @Post()
  async createCollection(
    @Body() collection: CreateCollectionDto,
    @Req() request: Request,
  ): Promise<CollectionDto> {
    // @ts-ignore
    return await this.collectionService.createCollection(
      collection,
      request.user,
    );
  }

  @Delete()
  @HttpCode(204)
  async deleteCollection(@Query('id') id: string): Promise<void> {
    return await this.collectionService.deleteCollection({
      where: {
        id: Number(id),
      },
    });
  }

  @Patch(":id")
  @HttpCode(200)
  async updateCollection(
    @Param('id') id: number,
    @Body() collectionUpdate: UpdateCollectionDto,
  ): Promise<CollectionDto> {
    return await this.collectionService.updateCollection(collectionUpdate, {
      where: {
        id: Number(id),
      },
    });
  }
}
