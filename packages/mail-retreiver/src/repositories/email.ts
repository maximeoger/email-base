import { PrismaClient, Email } from '@prisma/client';
import { CreateEmailDTO } from 'shared/types';

export default class EmailRepository {
  constructor(
    private prisma: PrismaClient,
    private dryRun: boolean
  ) {}

  async upsert (email: CreateEmailDTO, date: string) : Promise<Email> {

    if(this.dryRun) {
      console.log(`[DRY RUN] Skipping upsert of email : ${email.uid}`);
      return {
        //@ts-ignore
        id: 1,
        createdAt: new Date(),
        screenshotId: 1,
        ...email
      }
    }

    return await this.prisma.email.upsert({
      where: {
        uid: email.uid
      },
      create: {
        ...email,
        createdAt: date
      },
      update: {
        ...email,
      } 
    })
  }
}
