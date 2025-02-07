import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Prisma, Email } from '@prisma/client';
import convertBigIntToString from '../../helpers/convertBigIntToString';
import { AddMailToCollectionDto } from 'shared/types/mail';

@Injectable()
export class MailService {
  constructor(private prisma: PrismaService) {}

  async getEmails(params: {
    cursor?: number;
  }): Promise<{
    results: Email[];
    nextCusor: number;
  }> {
    const { cursor } = params;

    const skip = Number(cursor);
    const take = 10;

    const count = await this.prisma.email.count();

    const results = await this.prisma.email.findMany({
      take,
      skip,
      select: {
        id: true,
        screenshot: {
          select: {
            path: true,
            filename: true
          },
        },
      },
    });

    return {
      // @ts-ignore
      results: results.map((result) => convertBigIntToString<Email>(result)),
      ...(count > skip + take ? { nextCursor: skip + take } : {}),
    };
  }

  async getMailDetails(params: {
    where: {
      id: number;
    };
  }): Promise<any> {
    const result = await this.prisma.email.findUnique({
      where: params.where,
      include: {
        sender: true,
      },
    });

    return convertBigIntToString(result);
  }

  async addMailToCollection(body: AddMailToCollectionDto) {
    const { collectionId, mailId } = body;

    const createdRelationship = await this.prisma.collectionEmail.create({
      data: {
        collection: {
          connect: {
            id: collectionId,
          },
        },
        email: {
          connect: {
            id: mailId,
          },
        },
      },
    });
    return convertBigIntToString(createdRelationship);
  }
}
