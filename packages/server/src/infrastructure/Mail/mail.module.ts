import { Module } from '@nestjs/common'
import { MailController } from './mail.controller'
import { MailService } from './mail.service'
import { PrismaService } from 'src/core/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [MailController],
  providers: [MailService, PrismaService],
})
export class MailModule {}