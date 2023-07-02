import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  getHello(): string {
    return 'Hello newsletters !';
  }
}
