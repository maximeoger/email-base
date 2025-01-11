import { Controller, Get, Param, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail, MailsResponse } from './mail.interface';

@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  getEmails(@Query() query: any): Promise<MailsResponse> {
    return this.mailService.getEmails(query);
  }
  
  @Get(":id")
  getMailDetails(@Param("id") id: string): Promise<Mail> {
    return this.mailService.getMailDetails({
      where: {
        id: Number(id)
      }
    });
  }
}
