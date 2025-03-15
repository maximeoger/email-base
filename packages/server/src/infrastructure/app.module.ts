import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { CollectionModule } from './collection/collection.module';
import { ScreenshotModule } from "./screenshot/screenshot.module";
import { SenderModule } from './sender/sender.module';

@Module({
  imports: [
    MailModule,
    ScreenshotModule, 
    CollectionModule,
    SenderModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
