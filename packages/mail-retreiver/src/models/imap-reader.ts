import { FetchQueryObject } from "imapflow";

export interface ImapConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  tls: boolean;
  tlsOptions: {
    rejectUnauthorized: boolean;
  };
}

export interface ImapReaderMethods {
  getResults: () => any[];
  getMails: () => Promise<any[]>;
}

export interface ImapFlowClient {
  connect: () => Promise<void>;
  logout: () => Promise<void>;
  getMailboxLock: (mailbox: string) => Promise<any>;
  fetch: (range: string, query: FetchQueryObject) => AsyncIterable<any>;
  messageMove: (range: string, destination: string) => Record<string, any>;
}
