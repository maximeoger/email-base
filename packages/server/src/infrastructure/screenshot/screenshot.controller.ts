import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@Controller('api/screenshots')
export class ScreenshotController {
  @Get(':filename')
  getScreenshot(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '../../../../../mails-screenshots', filename);
    
    if (!existsSync(filePath)) {
      return res.status(404).send('Image not found');
    }

    const fileStream = createReadStream(filePath);

    res.type("image/jpeg").send(fileStream)
  }
}