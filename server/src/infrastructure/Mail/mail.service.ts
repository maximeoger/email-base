import { Injectable } from '@nestjs/common';
import {
  MailResponse,
  MailSnapshotResponse,
} from '../../domains/Mail/types/Mail.interface';
import MailRepository from '../../domains/Mail/MailRepository';

const MAX_EMAILS_PARSE = 24;

@Injectable()
export class MailService {

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
