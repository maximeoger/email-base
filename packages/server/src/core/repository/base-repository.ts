import { IWrite, IRead } from "src/models/repository/base-repository";

abstract class BaseRepository<T, I, U> implements IWrite<T, I, U>, IRead<T> {

  public readonly table: string
  public readonly client: any

  constructor (db: any, table: string) {
    this.table = table
    this.client = db
  }

  async create(item: I): Promise<T> {
    const table = this.table
    const { data, error } = await this.client.from(table).insert(item);
    
    if (error) throw new Error(`Failed to create collection`)
    
      return data
  }

  async update(id: number, item: U): Promise<T> {
      throw new Error("Method not implemented.");
  }

  async delete(id: number): Promise<boolean> {
      throw new Error("Method not implemented.");
  }

  async getAll(): Promise<T[]> {
    const table = this.table
    const { data, error } = await this.client.from(table).select('*');
    if (error) throw new Error(`Failed to fetch data: ${error.message}`);
    return data;
  }
  
  async getById(id: string): Promise<T> {
      throw new Error("Method not implemented.");
  }
}

export default BaseRepository;