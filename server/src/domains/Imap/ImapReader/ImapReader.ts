import Imap, { Box, ImapFetch } from 'imap';
import quotedPrintable from 'quoted-printable';
import { ParsedMail } from './interfaces';


export default class ImapReader {
  connection: Imap;

  constructor() {
    const { MAILBOX_USER, MAILBOX_PWD, IMAP_HOST, IMAP_PORT } = process.env;

    this.connection = new Imap({
      user: 'newsletterman32@gmail.com',
      password: 'nernxxdravvkmpyl',
      host: 'imap.gmail.com',
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

  async getMails(): Promise<any> {
    const connection = this.connection;

    const parsedMails = {};

    const fetch: ImapFetch = connection.seq.fetch('1:20', {
      bodies: ['HEADER.FIELDS (SUBJECT DATE)', 'TEXT'],
      struct: true,
      markSeen: false,
    });

    return new Promise((fulfill, reject) => {
      fetch.on('message', (message, seqno) => {
        message.on('body', async (stream, info) => {
          let buffer = '';
          parsedMails[seqno] = { ...parsedMails[seqno], seqno };

          stream.on('data', (chunk) => {
            buffer += chunk.toString('utf8');

            if (info.which === 'HEADER.FIELDS (SUBJECT DATE)') {
              const { subject, date } = Imap.parseHeader(buffer);
              parsedMails[seqno] = {
                ...parsedMails[seqno],
                subject: subject[0],
                date: date[0],
              };
            }

            if (info.which === 'TEXT') {
              parsedMails[seqno] = {
                ...parsedMails[seqno],
                body: quotedPrintable.decode(buffer),
              };
            }
          });

          stream.once('end', () => {
            // end
          });
        });
      });

      fetch.on('end', () => {
        fulfill(parsedMails);
      });

      fetch.on('error', (error) => {
        reject(error.message);
      });
    });
  }
}
