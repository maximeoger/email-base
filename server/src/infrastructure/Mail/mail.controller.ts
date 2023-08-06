import { Controller, Get, Param, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import {
  MailResponse,
  MailSnapshotResponse,
} from '../../domains/Mail/types/Mail.interface';

@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('')
  getEmails(@Query() query): Promise<MailSnapshotResponse[]> {
    const { start, limit } = query;
    return this.mailService.getEmails(Number(start), Number(limit));
  }
  @Get('/:id')
  getEmail(@Param() params: any): Promise<MailResponse> {
    const { id } = params;
    return this.mailService.getEmail(id);
  }
}
