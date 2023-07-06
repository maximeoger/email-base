import { Controller, Get, Param, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail } from './mail.interface';

@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('')
  getEmails(@Query() query): Promise<Mail[]> {
    const { min, max } = query;
    return this.mailService.getEmails(min, max);
  }
}
