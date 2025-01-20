import { AddMailToCollection, Mail } from "src/models/mail";
import { API } from "..";
import { APIInstance } from "src/models/api";

export class MailAPIRepository extends API {
  public constructor(instance: APIInstance) {
    super(instance);
  }

  public async getMails(cursor: number): Promise<any[]> {
    try {
      const response = await this.get<any>("/mails", `?cursor=${cursor}`);
      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async getMailDetails(mailId: string): Promise<Mail> {
    try {
      const response = await this.get<{ data: Mail }>(`/mails/${mailId}`);
      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async addMailToCollection(body: AddMailToCollection): Promise<void> {
    try {
      await this.post<AddMailToCollection, void>(
        "/mails/add-mail-to-collection",
        body,
      );
    } catch (error: unknown) {
      throw error;
    }
  }
}
