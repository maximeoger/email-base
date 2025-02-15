import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { Prisma } from '@prisma/client';
import { Request } from "express";

@Injectable()
export class CollectionService {

  private readonly logger = new Logger(CollectionService.name)

  constructor(
    private prisma: PrismaService,
  ) {}

  async getCollectionsWithEmailScreenshots(userId: number) {
    return  await this.prisma.collection.findMany({
      where: {
        userId: userId
      },
      include: {
        collectionEmail: {
          include: {
            email: {
              select: {
                id: true,
                screenshot: {
                  select: {
                    path: true,
                    filename: true
                  }
                }
              },
            }
          }
        }
      }
    })
  }

  async createCollection(data: Prisma.CollectionCreateInput, user: Request['user']) {
    return await this.prisma.collection.create({
      // @ts-ignore
      data: {
        ...data,
        userId: user.id
      }
    })
  }

  async deleteCollection(
    params: {
      where: Prisma.CollectionWhereUniqueInput
    }
  ): Promise<void> {
    await this.prisma.collection.delete(params)
  }

  async updateCollection(
    data: Prisma.CollectionUpdateInput,
    params: {
      where: Prisma.CollectionWhereUniqueInput
    }
  ): Promise<any> {
    return await this.prisma.collection.update({
      where: params.where,
      data
    })
  }
}