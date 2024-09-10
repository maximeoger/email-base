import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '../Mail/mail.module';

@Module({
  imports: [
    MailModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
