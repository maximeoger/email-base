export interface Mail {
  readonly html: string;
  timestamp?: any;
  readonly subject: string;
  date?: Date;
}

export interface MailToBeInstertedInDatabase extends Mail {
  readonly screenshot: string;
  readonly id?: string;
}

export interface MailSnapshotResponse {
  id: string;
  mailNo: number;
  date: string;
  subject: string;
  screenshot: string;
}

export interface MailResponse {
  id: string;
  mailNo: number;
  date: string;
  subject: string;
  html: string;
}