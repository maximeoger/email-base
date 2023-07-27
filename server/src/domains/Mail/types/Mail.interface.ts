
export interface Mail {
  readonly html: string;
  timestamp?: any;
  readonly subject: string;
  date?: Date;
}

export interface MailResponse extends Mail {
  readonly screenshot: string;
}
