import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { CollectionModule } from './collection/collection.module';
import { ScreenshotModule } from "./screenshot/screenshot.module";

@Module({
  imports: [
    MailModule,
    ScreenshotModule, 
    CollectionModule, 
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
