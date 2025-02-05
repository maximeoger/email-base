import { PrismaClient, sender } from '@prisma/client';
import { CreateSenderDTO } from "shared/types";

export default class SenderRepository {
  constructor(
    private prisma: PrismaClient,
    private dryRun: boolean
  ) {}

  async upsert (sender: CreateSenderDTO, date: string) : Promise<sender> {

    if (this.dryRun) {
      console.log(`[DRY RUN] Skipping upsert of sender : ${JSON.stringify(sender)}`);
      return {
        //@ts-ignore
        id: 1,
        ...sender
      }
    }

    return this.prisma.sender.upsert({
      where: {
        address: sender.address,
      },
      create: {
        ...sender,
        created_at: date
      },
      update: {
        ...sender,
        updated_at: date
      }
    })
  }
}
