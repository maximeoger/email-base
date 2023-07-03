import 'dotenv/config';
import puppeteer from 'puppeteer';
import ImapReader from './ImapReader/ImapReader';

(async () => {
  try {
    const imap = new ImapReader();
    const browser = await puppeteer.launch({ headless: 'new' });

    const connection = imap.connect();
    connection.on('error', (err) => console.log(err));
    await imap.openMailBox();
    const mails = await imap.getMails();

    for await (const mail of Object.values(mails) as any) {
      const page = await browser.newPage();
      await page.setContent(mail.body);
      await page.screenshot({ path: `${mail.seqno}.jpg`, omitBackground: false });
    }

    console.log(mails);
    await browser.close();
  } catch (err) {
    console.log(err);
  }
})();
