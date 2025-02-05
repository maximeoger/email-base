import { PrismaClient, email_screenshot } from "@prisma/client";
import { CreateScreenshotDTO } from "shared/types";

export default class ScreenshotRepository {
  constructor(
     private prisma: PrismaClient,
     private dryRun: boolean
   ) {}

  async upsert (screenshot: CreateScreenshotDTO, date: string) : Promise<email_screenshot> {

    if(this.dryRun) {
      console.log(`[DRY RUN] Skipping upsert of screenshot : ${screenshot.path}`);
      return {
        //@ts-ignore
        id: 1,
        ...screenshot
      }
    }

    return this.prisma.email_screenshot.upsert({
      where: {
        email_id: screenshot.email_id,
      }, 
      create: {
        ...screenshot,
        created_at: date,
      },
      update: {
        ...screenshot,
        updated_at: date
      }
    })
  }
 
}
