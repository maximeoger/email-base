import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import ImapReader from '../../domains/Imap/ImapReader/ImapReader';
import { Mail } from './mail.interface';
import dayjs from 'dayjs';

@Injectable()
export class MailService {
  async getEmails(min: number, max: number): Promise<Mail[]> {
    const imap = new ImapReader();
    const browser = await puppeteer.launch({ headless: 'new' });
    const response: Array<Mail> = [];
    const connection = imap.connect();

    connection.on('error', (err) => {
      throw err.message;
    });

    await imap.openMailBox();
    const mails = await imap.getMails(min, max);

    for await (const [seqno, { html, subject, date }] of mails) {
      if (!html || !subject || !date) continue;
      const page = await browser.newPage();
      await page.setContent(html);

      await page.setViewport({ width: 450, height: 600 });

      const screenshot = await page.screenshot({
        encoding: 'base64',
      });

      response.push({
        subject,
        date: dayjs(date).format('DD MMM YYYY'),
        screenshot: `data:image/jpg;base64,${screenshot}`,
      });

      page.close();
    }

    browser.close();

    return response;
  }
}
