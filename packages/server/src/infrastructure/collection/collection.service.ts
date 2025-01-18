import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { Prisma } from '@prisma/client';
import convertBigIntToString from "src/helpers/convertBigIntToString";


@Injectable()
export class CollectionService {

  private readonly logger = new Logger(CollectionService.name)

  constructor(
    private prisma: PrismaService,
  ) {}

  async getCollections(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.collectionWhereUniqueInput;
      where?: Prisma.collectionWhereInput;
    }
  ): Promise<any> {
    const collections = await this.prisma.collection.findMany(params)

    return collections.map(convertBigIntToString)
  }

  async createCollection(data: Prisma.collectionCreateInput, user: any): Promise<any> {
    // @ts-ignore
    const createdCollections = await this.prisma.collection.create({ data: {
      ...data,
      user_id: user.id
    } })

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