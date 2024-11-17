import { Module } from '@nestjs/common'
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import AuthGuard from '../auth/auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [CollectionController],
  providers: [CollectionService, PrismaService, AuthGuard],
})
export class CollectionModule {}