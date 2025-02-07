import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { Prisma } from '@prisma/client';
import convertBigIntToString from "src/helpers/convertBigIntToString";
import { format } from "date-fns";
import { Request } from "express";

@Injectable()
export class CollectionService {

  private readonly logger = new Logger(CollectionService.name)

  constructor(
    private prisma: PrismaService,
  ) {}

  async getCollections(userId: number) {
    const collections = await this.prisma.collection.findMany({
      where: {
        userId: userId
      },
      include: {
        _count: {
          select: { 
            collectionEmail: true 
          }
        }
      }
    })

    return collections.map(convertBigIntToString)
  }

  async createCollection(data: Prisma.CollectionCreateInput, user: Request['user']) {
    const createdCollections = await this.prisma.collection.create({
      // @ts-ignore
      data: {
        ...data,
        userId: user.id
      }
    })

    return convertBigIntToString(createdCollections)
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
    const updatedCollection = await this.prisma.collection.update({
      where: params.where,
      data
    })
    return convertBigIntToString(updatedCollection)
  }
}