import * as functions from 'firebase-functions';
import { getDatabase } from '../../Firestore';
import { getIncrement } from '../../helpers/getIncrement';

export const onCreate = functions.firestore
  .document('Mails/{mailId}')
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
