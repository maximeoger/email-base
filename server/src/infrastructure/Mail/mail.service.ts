import { Injectable } from '@nestjs/common';
import puppeteer, {Browser} from 'puppeteer';
import db from '../../domains/Database/Firestore/Firestore';
import { Timestamp } from 'firebase-admin/firestore';
import ImapReader from '../../domains/Imap/ImapReader/ImapReader';
import {Mail, MailResponse} from './mail.interface';
import dayjs from 'dayjs';

@Injectable()
export class MailService {
  async getScreenshotsFromEmail(
    browser: Browser,
    html: string,
  ): Promise<string> {
    const page = await browser.newPage();
    await page.setContent(html);
    await page.setViewport({ width: 450, height: 600 });
    const screenshot = await page.screenshot({ encoding: 'base64' });
    page.close();
    return screenshot;
  }

  async feedDatabase(): Promise<void> {
    const imap = new ImapReader();
    const connection = imap.connect();
    const browser = await puppeteer.launch({ headless: 'new' });

    connection.on('error', (err) => {
      throw err.message;
    });

    const box = await imap.openMailBox();
    const mails = await imap.getMails(box.messages.total);
    const collection = db.collection('mails');

    for await (const [seqno, { html, subject, date, from }] of mails) {
      if (!html || !subject || !date || !from) continue;

      const recievedDate = dayjs(date).format('MM-DD-YYYY');
      const senderName = from.value[0].name;
      const base64 = await this.getScreenshotsFromEmail(browser, html);

      await collection.add({
        subject,
        senderName,
        screenshot: `data:image/jpg;base64,${base64}`,
        date: Timestamp.fromDate(new Date(recievedDate)),
        html,
      });
    }
  }

  async getEmails(min: number, max: number): Promise<MailResponse[]> {
    const response: Array<MailResponse> = [];
    const mailsRef = db.collection('mails').orderBy('date').startAfter(Number(min)).limit(Number(max));
    const snapshot = await mailsRef.get();

    snapshot.forEach((doc) => {
      const { screenshot, subject, html, date } = doc.data();
      const jsDate = date.toDate();

      response.push({
        subject,
        html,
        date: jsDate,
        screenshot,
      });
    });

    return response;
  }
}
