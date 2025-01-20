import { AddMailToCollection, Mail } from "../mail";

export interface IMailAPIRepository {
  getMails(cursor: number): Promise<any>;
  getMailDetails(id: string): Promise<Mail>;
  addMailToCollection(body: AddMailToCollection): Promise<void>;
}

export const MailAPIRepositoryUID = Symbol("MailAPIRepository");
