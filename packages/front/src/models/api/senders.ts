import { AddMailToCollection, Mail } from "../mail";

export interface ISenderAPIRepository {
  getSenders(): Promise<any>;
}

export const SenderAPIRepositoryUID = Symbol("SenderAPIRepository");
