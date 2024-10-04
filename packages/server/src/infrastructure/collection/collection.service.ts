import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { Prisma } from '@prisma/client';


@Injectable()
export class CollectionService {

  constructor(private prisma: PrismaService) {}

  async getCollections(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.collectionWhereUniqueInput;
      where?: Prisma.collectionWhereInput;
    }
  ): Promise<any> {
    return this.prisma.collection.findMany(params)
  }

  async createCollection(data: Prisma.collectionCreateInput): Promise<any> {
    return this.prisma.collection.create({ data })
  }
}