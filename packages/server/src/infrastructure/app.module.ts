import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [MailModule, CollectionModule, ConfigModule.forRoot()],
})
export class AppModule {}
