
export interface ImapConfig {
  user: string;
  password: string;
  host: string;
  port: number;
  tls: boolean;
  tlsOptions: {
    rejectUnauthorized: boolean
  }
}

export interface ImapReaderMethods {
  getResults: () => any[];
  getMails: (from: string, to: string) => Promise<any[]>;
}

export interface ImapFlowClient {
  connect: () => Promise<void>;
  logout: () => Promise<void>;
  getMailboxLock: (mailbox: string) => Promise<any>;
  fetch: (sequence: string, query: Record<string, any>) => AsyncIterable<any>;
}