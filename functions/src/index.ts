/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as functions from "firebase-functions";

import {getDatabase} from "./helpers/getDatabase";
import {getIncrement} from "./helpers/getIncrement";

export const createMail = functions.firestore
  .document("Mails/{mailId}")
  .onCreate(async (snapshot) => {
    const counters = snapshot.ref.parent.parent?.collection("Counters");

    return getDatabase().runTransaction(async (transaction) => {
      // Read any other documents here before getting next increment value.
      const nextMailCounter = await getIncrement({
        transaction,
        path: counters,
        counterName: "mails",
      });

      // Update orderNo with sequence value
      transaction.update(snapshot.ref, {mailNo: nextMailCounter});
    });
  });
