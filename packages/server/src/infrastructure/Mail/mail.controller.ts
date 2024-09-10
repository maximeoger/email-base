import { Controller, Get, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail } from './mail.interface';

@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  getEmails(@Query() query: any): Promise<Mail[]> {
    const { cursor } = query;
    return this.mailService.getEmails(cursor);
  }
}
