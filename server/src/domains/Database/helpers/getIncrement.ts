import * as firebase from 'firebase-admin';
import { getDatabase } from '../Firestore/Firestore';

const defaultPath = 'Counters';

export interface IncrementParams {
  transaction: firebase.firestore.Transaction;
  counterName: string;
  path?: firebase.firestore.CollectionReference;
  startAt?: number;
  incrementValue?: number;
}

export async function getIncrement(args: IncrementParams): Promise<number> {
  let result = args.startAt ?? 1;

  const counterRef = args.path
    ? args.path.doc(args.counterName)
    : getDatabase().doc(`${defaultPath}/${args.counterName}`);

  const counterDoc = await args.transaction.get<any>(counterRef);

  if (counterDoc.exists) {
    const { counterValue } = counterDoc.data();
    result = counterValue + (args.incrementValue ?? 1);
    args.transaction.update(counterRef, { counterValue: result });
  } else {
    const counterValue = result;
    console.log(`Counter ${args.counterName} result ${result}`);
    args.transaction.create(counterRef, { counterValue });
  }

  return result;
}
