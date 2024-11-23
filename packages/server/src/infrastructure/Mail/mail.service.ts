import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import convertBigIntToString from "../../helpers/convertBigIntToString";


@Injectable()
export class MailService {

  private readonly logger = new Logger(MailService.name);

  constructor(private prisma: PrismaService) {}

  async getEmails(params: { cursor?: Prisma.emailWhereUniqueInput }): Promise<any> {
    const { cursor } = params;

    const skip = Number(cursor)
    const take = 10

    const count = await this.prisma.email.count()

    const results = await this.prisma.email.findMany({
      take,
      skip, 
      select: {
        id: true,
        email_screenshot_email_screenshot_idToemail_screenshot: {
          select: {
            base_64: true
          }
        }
      }
    })
    
    return {
      results: results.map((result) => convertBigIntToString(result)),
      ...( count > skip + take ? { nextCursor: skip + take } : {} )
    }
  }
}
