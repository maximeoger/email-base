import { APIInstance } from "src/models/api";
import { API } from "..";
import { SenderDTO } from "shared/types/sender";
 
export class SenderApiRepository extends API {
  public constructor(instance?: APIInstance) {
    super(instance)
  }

  public async getSenders () {
    try {
      const response = await this.get<{ data: SenderDTO[] }>("/api/senders")
      return response.data;
    } catch (error: unknown) {
      throw error; 
    }
  }
}