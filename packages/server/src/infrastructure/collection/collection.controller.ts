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
  Logger,
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

  private readonly logger = new Logger(CollectionService.name)
  
  constructor(private readonly collectionService: CollectionService) {}

  @Get()
  async getCollections(@Req() request: Request): Promise<CollectionDto[]> {
    const collections = await this.collectionService.getCollectionsWithEmailScreenshots(
      request.user.id,
    );
    return collections.map((collection: typeof collections[number]) => {
      const dto = new CollectionDto();
      dto.id = Number(collection.id);
      dto.createdAt = collection.createdAt;
      dto.updatedAt = collection.updatedAt;
      dto.description = collection.description;
      dto.name = collection.name;
      dto.emailIds = collection.collectionEmail.map(ce => ce.emailId);
      dto.screenshots = collection.collectionEmail.map(ce => ({
        path: ce.email.screenshot.path,
        filename: ce.email.screenshot.filename
      }));
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
