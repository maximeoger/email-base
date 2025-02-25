import { AddMailToCollection, Mail } from "src/models/mail";
import { API } from "..";
import { APIInstance } from "src/models/api";

export class MailAPIRepository extends API {
  public constructor(instance?: APIInstance | undefined) {
    super(instance);
  }

  public async getMails(cursor: number): Promise<any[]> {
    try {
      const response = await this.get<any>("/api/mails", `?cursor=${cursor}`);
      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async getMailDetails(mailId: string): Promise<Mail> {
    try {
      const response = await this.get<{ data: Mail }>(`/api/mails/${mailId}`);
      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async addMailToCollection(body: AddMailToCollection): Promise<void> {
    try {
      await this.post<AddMailToCollection, void>(
        "/api/mails/add-mail-to-collection",
        body,
      );
    } catch (error: unknown) {
      throw error;
    }
  }
}
