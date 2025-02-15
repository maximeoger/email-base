import { Module } from '@nestjs/common';
import { ScreenshotController } from './screenshot.controller';

@Module({
  imports: [],
  controllers: [ScreenshotController],
})
export class ScreenshotModule {}
