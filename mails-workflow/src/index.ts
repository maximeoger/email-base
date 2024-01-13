import dayjs from 'dayjs';
import puppeteer, { Browser } from "puppeteer";
import {config} from "dotenv";
import ImapReader from "./domains/ImapReader/ImapReader";

config();

async function getScreenshotsFromEmail(
  browser: Browser,
  html: string,
): Promise<string> {
  const page = await browser.newPage();
  const contentViewport = await page.evaluate(() => {
    const content = document.body;
    return {
      width: content ? content.offsetWidth : 0,
      height: content ? content.offsetHeight : 0,
    };
  });
  await page.goto(`data:text/html,${html}`, { waitUntil: 'networkidle0' });
  await page.setViewport(contentViewport);
  const screenshot = await page.screenshot({ encoding: 'base64' });
  page.close();
  return screenshot;
}

async function run() {
  const imap = new ImapReader();
  const connection = imap.connect();

  connection.on('error', (err) => {
    throw err.message;
  });
  const browser = await puppeteer.launch({ headless: 'new' });
  const box = await imap.openMailBox();
  const mails = await imap.getMails(1, 15);

  for await (const [seqno, {html, subject, date, from, messageId}] of mails) {
    const recievedDate = dayjs(date).format('MM-DD-YYYY');
    const senderName = from.value[0].name;

    if(html) {
      console.log('Getting mail screenshot ...')
      const base64 = await getScreenshotsFromEmail(browser, html);

      const document = {
        date: new Date(recievedDate),
        subject,
        senderName,
        screenshot: `data:image/jpg;base64,${base64}`,
        html,
      };

      console.info(`MailNO: ${seqno} added`, {
        uid: messageId,
        subject,
        base64
      });
    }

    process.exit(0);
  }
};

run();
