import BaseRepository from '../../core/repository/base-repository';
import { Tables, TablesInsert, TablesUpdate } from 'common/types';

type EmailRow = Tables<"email">;
type EmailInsert = TablesInsert<"email">;
type EmailUpdate = TablesUpdate<"email">;

export default class MailRepository extends BaseRepository<EmailRow, EmailInsert, EmailUpdate> {

  static init (dbClient: any) {
    return new MailRepository(dbClient, "email")
  }

  public async getWithinRange(from: number, to: number) {
    const table = this.table
    const client = this.client

    const { data, error } = await client.from(table).select(`
        id,
        subject,
        uid,
        received_date,
        screenshot: screenshot_id (
          base_64
        ),
        sender: sender_id (
          name,
          address
        )
    `).range(from, to)

    if (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }

    return data;
  }
  
}
