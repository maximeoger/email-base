import { MailToBeInstertedInDatabase } from './types/Mail.interface';
import { getDatabase } from '../Database/Firestore/Firestore';

import {
  DocumentReference,
  DocumentData,
  Timestamp,
} from 'firebase-admin/firestore';

type DocumentRef = DocumentReference<DocumentData>;

class MailRepository {
  static createMail(doc: MailToBeInstertedInDatabase): Promise<DocumentRef> {
    const timeStamp = Timestamp.fromDate(doc.date);
    return getDatabase()
      .collection('Mails')
      .add({
        ...doc,
        timestamp: timeStamp,
      });
  }

  static getMailReference() {
    return getDatabase().collection('Mails');
  }

  static async getEmailById(id: string) {
    const document = await getDatabase().collection('Mails').doc(id).get();
    if (!document) {
      throw Error('No document found');
    }
    return document.data();
  }
}

export default MailRepository;
