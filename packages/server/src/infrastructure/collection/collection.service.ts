import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { Prisma } from '@prisma/client';
import convertBigIntToString from "src/helpers/convertBigIntToString";
import { format } from "date-fns";
import { Request } from "express";

@Injectable()
export class CollectionService {
  
  constructor(
    private prisma: PrismaService,
  ) {}

  async getCollections(userId: number) {
    const collections = await this.prisma.collection.findMany({
      where: {
        user_id: userId
      },
      include: {
        collection_email: {
          select: {
            email_id: true
          }
        }
      }
    })

    return collections.map(collection => ({
      ...convertBigIntToString(collection),
      emailIds: collection.collection_email.map(email => convertBigIntToString(email))
    }))
  }

  async createCollection(data: Prisma.collectionCreateInput, user: Request['user']) {
    const createdCollections = await this.prisma.collection.create({
      // @ts-ignore
      data: {
        ...data,
        user_id: user.id
      }
    })

    return convertBigIntToString(createdCollections)
  }

  async deleteCollection(
    params: {
      where: Prisma.collectionWhereUniqueInput
    }
  ): Promise<void> {
    await this.prisma.collection.delete(params)
  }

  async updateCollection(
    data: Prisma.collectionUpdateInput,
    params: {
      where: Prisma.collectionWhereUniqueInput
    }
  ): Promise<any> {
    const updatedCollection = await this.prisma.collection.update({
      where: params.where,
      data
    })
    return convertBigIntToString(updatedCollection)
  }
}