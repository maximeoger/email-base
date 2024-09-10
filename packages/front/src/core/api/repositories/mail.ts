import { API } from "..";

export class MailAPIRepository extends API {
  public constructor() {
    super(null)
  }

  public async getMails(cursor: number): Promise<any[]> {
    try {
      const response = await this.get<any>("/mails", `?cursor=${cursor}`)
      return response.data
    } catch(error) {
      throw new Error(error)
    }
  }
}