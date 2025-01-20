import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import convertBigIntToString from 'src/helpers/convertBigIntToString';
import e, { Request } from 'express';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

  async getCollections(userId: number) {
    const collections = await this.prisma.collection.findMany({
      where: {
        user_id: userId,
      },
      include: {
        collection_email: {
          include: {
            email: {
              include: {
                email_screenshot_email_screenshot_email_idToemail: true,
              },
            },
          },
        },
      },
    });

    return collections.map((collection) => {
      const emailIds = collection.collection_email.map((ce) =>
        Number(ce.email_id),
      );

      const screenshots = collection.collection_email
        .map((ce) => {
          const email = ce.email;
          const screenshot =
            email.email_screenshot_email_screenshot_email_idToemail?.base_64;
          return { email, screenshot };
        })
        .sort(
          (a, b) =>
            new Date(a.email.created_at).getTime() -
            new Date(b.email.created_at).getTime(),
        )
        .slice(0, 3)
        .map((entry) => entry.screenshot);

      return {
        ...collection,
        emailIds,
        screenshots,
      };
    });
  }

  async createCollection(
    data: Prisma.collectionCreateInput,
    user: Request['user'],
  ) {
    const createdCollections = await this.prisma.collection.create({
      // @ts-ignore
      data: {
        ...data,
        user_id: user.id,
      },
    });

    return convertBigIntToString(createdCollections);
  }

  async deleteCollection(params: {
    where: Prisma.collectionWhereUniqueInput;
  }): Promise<void> {
    await this.prisma.collection.delete(params);
  }

  async updateCollection(
    data: Prisma.collectionUpdateInput,
    params: {
      where: Prisma.collectionWhereUniqueInput;
    },
  ): Promise<any> {
    const updatedCollection = await this.prisma.collection.update({
      where: params.where,
      data,
    });
    return convertBigIntToString(updatedCollection);
  }
}
