export interface IMailAPIRepository {
  getMails(cursor: number): Promise<any>
}

export const MailAPIRepositoryUID = Symbol("MailAPIRepository")