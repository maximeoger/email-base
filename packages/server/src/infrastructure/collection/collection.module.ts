import { Module } from '@nestjs/common'
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [CollectionController],
  providers: [CollectionService, PrismaService],
})
export class CollectionModule {}