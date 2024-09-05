import { simpleParser } from 'mailparser';
import { ImapFlow } from "imapflow";
import ImapReader from './services/imap-reader';
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'
import { format } from "date-fns";
import 'dotenv/config'

async function main () {
  const { IMAP_USER, IMAP_APP_PWD, IMAP_HOST, SUPABASE_PROJECT_URL, SUPABASE_PROJECT_ANON_KEY } = process.env;

  const client = new ImapFlow({
    host: IMAP_HOST as string,
    port: 993,
    secure: true,
    auth: {
      user: IMAP_USER as string,
      pass: IMAP_APP_PWD
    }
  })

  const imapReader = ImapReader.init(client)

  await imapReader.getMails("1", "*")

  const results = imapReader.getResults()
  const supabase = createClient<Database>(SUPABASE_PROJECT_URL as string, SUPABASE_PROJECT_ANON_KEY as string)

  try {
    for await (let mail of results) {
      
      let parsed = await simpleParser(mail.source)
      let created_at = format(new Date(), 'yyyy-dd-MM hh:mm:ss')

      const toInsert = { 
        uid: mail.uid,
        subject: mail.envelope.subject,
        sender: mail.envelope.sender,
        recipients: mail.envelope.to.map(({ address }) => address),
        date: mail.envelope.date,
        received_date: mail.envelope.date,
        size: mail.size,
        body: parsed.text,
        body_html: parsed.html,
        created_at
      }
        
      const { data, error } = await supabase.from('email').upsert(toInsert, { onConflict: "uid" })
      
      if (error) throw error

    }

    console.log(`${results.length} mails inserted.`)
    process.exit(0)

  } catch (error: unknown) {
    console.error('ERROR - ', error)
    process.exit(1)
  }
  
}

main()
