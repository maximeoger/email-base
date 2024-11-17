import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/core/prisma/prisma.service";
import { Prisma } from '@prisma/client';
import convertBigIntToString from "src/helpers/convertBigIntToString";
import AuthService from "../auth/auth.service";
import util from "node:util"

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

  async createCollection(data: Prisma.collectionCreateInput, session: any): Promise<any> {
    // @ts-ignore
    const createdCollections = await this.prisma.collection.create({ data: {
      ...data,
      user_id: session.users.id
    } })

    return convertBigIntToString(createdCollections)
  }
}