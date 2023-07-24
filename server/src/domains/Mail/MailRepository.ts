import * as functions from 'firebase-functions';
import { MailResponse } from './types/Mail.interface';
import { getIncrement } from '../Database/helpers/getIncrement';
import { getDatabase } from '../Database/Firestore/Firestore';

class MailRepository {
  static createMail(doc: MailResponse, seq: number): void {
    functions.firestore
      .document('mails/{mailId}')
      .onCreate(async (snapshot, context) => {
        const counters = snapshot.ref.parent.parent?.collection('Counters');
        return getDatabase().runTransaction(async (transaction) => {
          const nextMailCounter = await getIncrement({
            transaction,
            path: counters,
            counterName: 'mail',
          });
          transaction.update(snapshot.ref, { orderNo: nextMailCounter });
        });
      });
  }
}

export default MailRepository;
