export interface Mail {
  readonly html: string;
  readonly date: Date;
  readonly subject: string;
}

export interface MailResponse extends Mail {
  readonly screenshot: string;
}

