import "dotenv/config";
import yargs from "yargs";
import path from "path"
import puppeteer from "puppeteer";
import fs from 'fs/promises';
import { PrismaClient } from '@prisma/client';
import { formatISO } from "date-fns";

import GmailClient from "./services/gmail-client";
import OAuthClient, { readCredentials } from "./services/oAuth-client";
import parseEmails, { parseFromHeader } from "./utils/mail-parser";
import ScreenshotMaker from "./services/screenshot-maker";
import SenderRepository from "./repositories/sender";
import EmailRepository from "./repositories/email";
import ScreenshotRepository from "./repositories/screenshot";

async function main() {
  try {
    const { dryRun } = yargs(process.argv.slice(2))
      .options({
        dryRun: { type: "boolean", default: true },
      })
      .parseSync();

    const prisma = new PrismaClient()

    const senderRepository = new SenderRepository(prisma, dryRun)
    const emailRepository = new EmailRepository(prisma, dryRun)
    const screenshotRepository = new ScreenshotRepository(prisma, dryRun)
    
    const credentials = await readCredentials()
    const oAuthClient = new OAuthClient(credentials)

    await oAuthClient.authorize()

    const gmailClient = new GmailClient(oAuthClient.client)
    let mails = await gmailClient.getEmails("ready")

    const parsedEmails = parseEmails(mails);

    console.info(`Nombre d'emails trouvés: ${parsedEmails.length}`);

    const browser = await puppeteer.launch({ headless: true });
    const screenshotMaker = ScreenshotMaker.init(browser);

    const screenshotsDir = path.join(process.cwd(), "../../mails-screenshots");
    await fs.mkdir(screenshotsDir, { recursive: true });

    for (const email of parsedEmails) {
      if (!email.htmlBody) {
        console.info(`Email ${email.id} : No html content`);
        continue;
      }

      const parsedFrom = parseFromHeader(email.from!)
      const date = formatISO(new Date());

      const dbSender = await senderRepository.upsert(parsedFrom, date)

      const dbEmail = await emailRepository.upsert({
        uid: email.id,
        subject: email.subject!,
        senderId: Number(dbSender.id),
        bodyHtml: email.htmlBody
      }, date)

      const screenshotBuffer = await screenshotMaker.takeScreenshot(email.htmlBody);

      const screenshotFilename = `${dbEmail.uid}.jpg`;

      const outputFileName = path.join(screenshotsDir, screenshotFilename);

      if (!dryRun) {
        //@ts-ignore
        await fs.writeFile(outputFileName, screenshotBuffer as NodeJS.ArrayBufferView);
      } else {
        console.log(`[DRY RUN] skipping screenshot of : ${screenshotFilename}`);
      }

      await screenshotRepository.upsert({
        filename: screenshotFilename,
        path: "email-screenshots/",
        emailId: Number(dbEmail.id)
      }, date)
      
    }

    await browser.close();

    console.log("Done.");
    process.exit(0);
  } catch (error: unknown) {
    console.error("ERROR - ", error);
    process.exit(1);
  }
}


main()
