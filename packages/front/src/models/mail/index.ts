import { Sender } from "../sender";

export interface Mail {
  id: number;
  uid: number;
  subject: string;
  recipient: string;
  date: string;
  received_date: string;
  size: number;
  bodyHtml: string;
  sender: Sender;
}

export interface AddMailToCollection {
  mailId: number;
  collectionId: number;
}
