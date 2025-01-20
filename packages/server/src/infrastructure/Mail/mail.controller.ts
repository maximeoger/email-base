import { Controller, Get, Post, Param, Query, Body, HttpCode, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail, MailsResponse } from './mail.interface';
//import { AddMailToCollectionDto } from 'shared/types/mail';
import AuthGuard from '../auth/auth.guard';

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

  @Post("add-mail-to-collection")
  @HttpCode(201)
  @UseGuards(AuthGuard)
  addMailToCollection(@Body() body: any) {
    return this.mailService.addMailToCollection(body)
  }
}

