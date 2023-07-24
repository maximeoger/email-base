import { Controller, Get, Param, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailResponse } from '../../domains/Mail/types/Mail.interface';

@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('')
  getEmails(@Query() query): Promise<MailResponse[]> {
    const { min, max } = query;
    return this.mailService.getEmails(min, max);
  }
}
