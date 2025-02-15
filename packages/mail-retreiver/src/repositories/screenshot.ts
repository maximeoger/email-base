import { PrismaClient, EmailScreenshot } from "@prisma/client";
import { CreateScreenshotDTO } from "shared/types";

export default class ScreenshotRepository {
  constructor(
     private prisma: PrismaClient,
     private dryRun: boolean
   ) {}

  async upsert (screenshot: CreateScreenshotDTO, date: string) : Promise<EmailScreenshot> {
    let now = new Date();

    if(this.dryRun) {
      console.log(`[DRY RUN] Skipping upsert of screenshot : ${screenshot.path}`);
      return {
        //@ts-ignore
        id: 1,
        createdAt: now,
        updatedAt: now,
        ...screenshot
      }
    }

    return this.prisma.emailScreenshot.upsert({
      where: {
        emailId: screenshot.emailId,
      }, 
      create: {
        ...screenshot,
        createdAt: date,
      },
      update: {
        ...screenshot,
        updatedAt: date
      }
    })
  }
 
}
