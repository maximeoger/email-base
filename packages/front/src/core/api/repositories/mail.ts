import { API } from "..";

export class MailAPIRepository extends API {
  public constructor() {
    super(null)
  }

  public async getMails(query: string): Promise<any[]> {
    try {
      const response = await this.get<any>("/mails", query)
      return response.data
    } catch(error) {
      throw new Error(error)
    }
  }
}