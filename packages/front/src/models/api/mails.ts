export interface IMailAPIRepository {
  getMails(query: string): Promise<any>
}

export const MailAPIRepositoryUID = Symbol("MailAPIRepository")