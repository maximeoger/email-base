import {initializeApp} from "firebase-admin/app";
import {Firestore, getFirestore} from "firebase-admin/firestore";

let hasInit = false;

export function initialiseDatabase(): void {
  if (!hasInit) {
    initializeApp();
    hasInit = true;
  }
}

let _db: Firestore;

export function getDatabase(): Firestore {
  initialiseDatabase();
  return _db ?? (_db = getFirestore());
}
