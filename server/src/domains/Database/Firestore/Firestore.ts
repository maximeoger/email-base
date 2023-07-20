import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../../serviceAccount.json';

initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

const db = getFirestore();

export default db;
