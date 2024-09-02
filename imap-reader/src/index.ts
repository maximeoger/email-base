import Imap, { Box, ImapFetch } from 'imap';
import { simpleParser, ParsedMail } from 'mailparser';
import { ImapFlow } from "imapflow";
import ImapReader from './services/imap';

async function main () {
  const { IMAP_USER, IMAP_APP_PWD, IMAP_HOST } = process.env;

  const client = new ImapFlow({
    host: IMAP_HOST,
    port: 993,
    secure: true,
    auth: {
      user: IMAP_USER,
      pass: IMAP_APP_PWD
    }
  })

  const imapReader = ImapReader.init(client)

  await imapReader.getMails("1", "10")
  const results = imapReader.getResults()
}

main()