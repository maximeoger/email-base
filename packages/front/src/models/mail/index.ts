import { Sender } from "../sender";

export interface Mail {
  id: number;
  uid: number;
  subject: string;
  recipient: string;
  date: string;
  received_date: string;
  size: number;
  body_html: string;
  sender: Sender;
}

export interface AddMailToCollection {
  mailId: number;
  collectionId: number;
}