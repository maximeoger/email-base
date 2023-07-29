import { MailResponse } from './types/Mail.interface';
import { getDatabase } from '../Database/Firestore/Firestore';
import {
  DocumentReference,
  DocumentData,
  Timestamp,
} from 'firebase-admin/firestore';

type DocumentRef = DocumentReference<DocumentData>;

class MailRepository {
  static createMail(doc: MailResponse): Promise<DocumentRef> {
    const timeStamp = Timestamp.fromDate(doc.date);
    return getDatabase()
      .collection('Mails')
      .add({
        ...doc,
        timestamp: timeStamp,
      });
  }

  static getMailAfter(after: Date, limit: number) {
    return getDatabase()
      .collection('Mails')
      .orderBy('timestamp')
      .startAfter(after)
      .limit(limit);
  }
}

export default MailRepository;
