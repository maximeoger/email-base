import { Mail } from "../mail";

export interface IMailAPIRepository {
  getMails(cursor: number): Promise<any>;
  getMailDetails(id: string): Promise<Mail>;
}

export const MailAPIRepositoryUID = Symbol("MailAPIRepository")