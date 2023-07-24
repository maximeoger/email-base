import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../../serviceAccount.json';

let hasInit = false;

export function initialiseDatabase(): void {
  if (!hasInit) {
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
    hasInit = true;
  }
}

let _db: Firestore;

export function getDatabase(): Firestore {
  initialiseDatabase();
  return _db ?? (_db = getFirestore());
}