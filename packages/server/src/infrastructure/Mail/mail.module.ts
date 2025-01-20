import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import AuthGuard from '../auth/auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [MailController],
  providers: [MailService, PrismaService, AuthGuard],
})
export class MailModule {}
