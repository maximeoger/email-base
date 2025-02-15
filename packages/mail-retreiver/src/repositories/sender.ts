import { PrismaClient, Sender } from '@prisma/client';
import { CreateSenderDTO } from "shared/types";

export default class SenderRepository {
  constructor(
    private prisma: PrismaClient,
    private dryRun: boolean
  ) {}

  async upsert (sender: CreateSenderDTO, date: string) : Promise<Sender> {

    const now = new Date();

    if (this.dryRun) {
      console.log(`[DRY RUN] Skipping upsert of sender : ${JSON.stringify(sender)}`);
      return {
        //@ts-ignore
        id: 1,
        logo: "",
        createdAt: now,
        updatedAt: now,
        ...sender
      }
    }

    return this.prisma.sender.upsert({
      where: {
        address: sender.address,
      },
      create: {
        ...sender,
        createdAt: date
      },
      update: {
        ...sender,
        updatedAt: date
      }
    })
  }
}
