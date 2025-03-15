import { Injectable } from "@nestjs/common";
import { equal } from "assert";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class SenderService {
  constructor(private prisma: PrismaService) {}

  async getSenderDetails (params: {id: number}) {
    const { id } = params;

    return await this.prisma.sender.findFirst({
      select: {
        id: true,
        name: true,
        address: true,
      },
      where: {
        id: {
          equals: id
        }
      } 
    })
  }
}