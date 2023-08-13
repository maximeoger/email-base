import Imap, { Box, ImapFetch } from 'imap';
import { simpleParser, ParsedMail } from 'mailparser';

type Results = Map<number, ParsedMail>;

export default class ImapReader {
  connection: Imap;

  constructor() {
    const { MAILBOX_USER, MAILBOX_APP_PWD, IMAP_HOST } = process.env;

    this.connection = new Imap({
      user: MAILBOX_USER,
      password: MAILBOX_APP_PWD,
      host: IMAP_HOST,
      port: 993,
      tls: true,
      tlsOptions: {
        rejectUnauthorized: false,
      },
    });
  }

  connect(): Imap {
    this.connection.connect();
    return this.connection;
  }

  async openMailBox(): Promise<Box> {
    const connection = this.connection;
    return new Promise((fulfill, reject) => {
      connection.once('ready', () => {
        connection.openBox('INBOX', true, (error: Error, mailbox: Box) => {
          if (error) reject(error);
          fulfill(mailbox);
        });
      });
      connection.on('error', (error: Error) => reject(error));
    });
  }

  async getMails(from: number, to: number): Promise<Results> {
    const connection = this.connection;

    const parsedMails: Results = new Map();

    const fetch: ImapFetch = connection.seq.fetch(`${from}:${to}`, {
      bodies: [''],
    });

    return new Promise((fulfill, reject) => {
      fetch.on('message', (message, seqno) => {
        message.on('body', async (stream) => {
          const parsed = await simpleParser(stream);

          if (!parsed) {
            throw Error('parse error');
          }

          parsedMails.set(seqno, parsed);
        });
      });

      fetch.once('end', () => {
        /*
          Workaround to "wait" for the parsing of the last email
          See more here ==> https://github.com/mscdex/node-imap/issues/774
        */
        setTimeout(() => {
          fulfill(parsedMails);
        }, 1000);
      });

      fetch.on('error', (error) => {
        reject(error.message);
      });
    });
  }
}
