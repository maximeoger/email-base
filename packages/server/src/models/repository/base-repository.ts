export interface IWrite<T, I, U> {
  create(item: I): Promise<T>;
  update(id: number, item: U): Promise<T | null>;
  delete(id: number): Promise<boolean>;
}

export interface IRead<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
}