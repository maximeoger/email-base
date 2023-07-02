import { Module } from '@nestjs/common';
import { MailModule } from './Mail/mail.module';

@Module({
  imports: [MailModule]
})
export class AppModule {}
