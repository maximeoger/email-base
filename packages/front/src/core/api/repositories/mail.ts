import { Mail } from "src/models/mail";
import { API } from "..";

export class MailAPIRepository extends API {
  public constructor() {
    super(null)
  }

  public async getMails(cursor: number): Promise<any[]> {
    try {
      const response = await this.get<any>("/mails", `?cursor=${cursor}`)
      return response.data
    } catch(error: unknown) {
      throw error
    }
  }

  public async getMailDetails(mailId: string): Promise<Mail> {
    try {
      const response = await this.get<{ data: Mail }>(`/mails/${mailId}`)
      return response.data
    } catch (error: unknown) {
      throw error
    }
  }
}