import { Module } from '@nestjs/common';
import AuthService from './auth.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}