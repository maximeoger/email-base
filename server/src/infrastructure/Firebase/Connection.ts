import { initializeApp, cert } from 'firebase-admin/app';
import serviceAccount from 'serviceAccount.json';
import { getFirestore } from 'firebase-admin/lib/firestore';

initializeApp({
  credential: cert(serviceAccount),
});

const database = getFirestore();

export default database;
