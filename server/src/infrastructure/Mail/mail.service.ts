import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import puppeteer, { Browser } from 'puppeteer';
import ImapReader from '../../domains/Imap/ImapReader/ImapReader';
import {
  MailResponse,
  MailSnapshotResponse,
} from '../../domains/Mail/types/Mail.interface';
import MailRepository from '../../domains/Mail/MailRepository';

const MAX_EMAILS_PARSE = 24;

@Injectable()
export class MailService {
  async getScreenshotsFromEmail(
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

  async feedDatabase(): Promise<void> {
    const imap = new ImapReader();
    const connection = imap.connect();
    const browser = await puppeteer.launch({ headless: 'new' });

    connection.on('error', (err) => {
      throw err.message;
    });

    const reference = await MailRepository.getMailReference();
    const countSnapshot = await reference.count().get();
    const count = countSnapshot.data().count;

    const box = await imap.openMailBox();
    const mails = await imap.getMails(
      count === 0 ? 1 : count,
      count + MAX_EMAILS_PARSE,
    );

    console.log('LOG', {
      size: mails.size,
      from: count,
      to: count + MAX_EMAILS_PARSE,
      uidValidity: box.uidvalidity,
    });

    for await (const [seqno, { html, subject, date, from, messageId }] of mails) {
      if (!html || !subject || !date || !from) continue;

      const recievedDate = dayjs(date).format('MM-DD-YYYY');
      const senderName = from.value[0].name;

      console.log('Getting mail screenshot ...')
      const base64 = await this.getScreenshotsFromEmail(browser, html);

      const document = {
        date: new Date(recievedDate),
        subject,
        senderName,
        screenshot: `data:image/jpg;base64,${base64}`,
        html,
      };
      await MailRepository.createMail(document);
      console.info(`MailNO: ${seqno} added`, {
        uid: messageId,
        subject,
      });
    }

    process.exit(0);
  }

  async getEmails(start: number, limit: number): Promise<any> {
    const response: Array<MailSnapshotResponse> = [];

    const reference = await MailRepository.getMailReference();

    const snapshot = await reference
      .orderBy('mailNo')
      .startAfter(start)
      .limit(limit)
      .get();

    const countSnapshot = await reference.count().get();

    snapshot.forEach((doc) => {
      const { screenshot, subject, timestamp, mailNo } = doc.data();
      const jsDate = timestamp.toDate();
      response.push({
        id: doc.id,
        mailNo,
        date: jsDate,
        subject,
        screenshot,
      });
    });

    return {
      total: countSnapshot.data().count,
      data: response,
    };
  }

  async getEmail(id: string): Promise<MailResponse> {
    const { mailNo, date, subject, html } = await MailRepository.getEmailById(id);
    return {
      id,
      mailNo,
      date,
      subject,
      html,
    };
  }
}
