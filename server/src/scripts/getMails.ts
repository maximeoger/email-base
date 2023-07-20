import 'dotenv/config';
import { MailService } from '../infrastructure/Mail/mail.service';
import db from '../domains/Database/Firestore/Firestore';

async function getMails(): Promise<void> {
  try {
    const mailService = new MailService();
    await mailService.feedDatabase();
  } catch(err) {
    console.log(err.message);
  }
}

getMails();