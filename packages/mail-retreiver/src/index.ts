import { simpleParser } from 'mailparser';
import { ImapFlow } from "imapflow";
import ImapReader from './services/imap-reader';
import { createClient } from '@supabase/supabase-js'
import { Database } from 'common/types'
import { format } from "date-fns";
import 'dotenv/config'
import ScreenshotMaker from './services/screenshot-maker';
import puppeteer from 'puppeteer';
import sharp from "sharp";

const { IMAP_USER, IMAP_APP_PWD, IMAP_HOST, SUPABASE_PROJECT_URL, SUPABASE_PROJECT_ANON_KEY } = process.env;
const supabase = createClient<Database>(SUPABASE_PROJECT_URL as string, SUPABASE_PROJECT_ANON_KEY as string)


async function fetchMails (from: string, to: string) {
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

  await imapReader.getMails(from, to)

  const results = imapReader.getResults()
  

    for await (let mail of results) {
      
      let parsed = await simpleParser(mail.source)
      let created_at = format(new Date(), 'yyyy-dd-MM hh:mm:ss')
      
      const senderToUpsert = {
        name: mail.envelope.sender[0].name,
        address: mail.envelope.sender[0].address,
        created_at
      }

      await supabase.from("sender").upsert(senderToUpsert, { onConflict: "address" })
      
      const { data: senders, error } = await supabase.from("sender").select("id").eq("address", mail.envelope.sender[0].address)

      if (senders) {
        const mailToUpsert = { 
          uid: mail.uid,
          subject: mail.envelope.subject,
          sender_id: senders[0].id,
          recipients: mail.envelope.to.map(({ address }) => address),
          date: mail.envelope.date,
          received_date: mail.envelope.date,
          size: mail.size,
          body: parsed.text,
          body_html: parsed.html,
          created_at
        }
         
        const { error: mailUpsertError } = await supabase.from('email').upsert(mailToUpsert, { onConflict: "uid" })

        if (mailUpsertError) throw mailUpsertError
      }

      if (error) throw error

    }

    console.log(`${results.length} mails inserted.`)
  
}

async function generateScreenshots () {
  const browser = await puppeteer.launch()
  const screenShotmaker = ScreenshotMaker.init(browser)


  const { data: mailData, error } = await supabase.from("email").select("id, body_html")
    
  if (error) throw Error("Failed to query emails data")

  if (mailData) {
    for await ( let { id, body_html } of mailData) {
      const screenshot = await screenShotmaker.takeScreenshot(body_html as string)
      let created_at = format(new Date(), 'yyyy-dd-MM hh:mm:ss')

      const webpBuffer = await sharp(screenshot).webp({ quality: 80 }).toBuffer()

      const screenshotToUpsert = {
        created_at,
        base_64: `data:image/webp;base64,${webpBuffer.toString("base64")}`,
        email_id: id
      }

      const { data, error: upsertError } = await supabase.from("email_screenshot").upsert(screenshotToUpsert, { onConflict: "email_id" }).select('id')

      if (error) throw upsertError;

      const { data: updateData, error: updateError } = await supabase.from("email").update({ screenshot_id: data![0].id }).eq("id", id)

      if (updateError) throw updateError
    }
  }
}

async function main () {
  try {

    //await fetchMails("1", "10")
    await generateScreenshots()

    process.exit(0)

  } catch (error: unknown) {
    console.error('ERROR - ', error)
    process.exit(1)
  }

}

main()
