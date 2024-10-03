import { simpleParser } from 'mailparser';
import { ImapFlow } from "imapflow";
import ImapReader from './services/imap-reader';
import { format } from "date-fns";
import ScreenshotMaker from './services/screenshot-maker';
import puppeteer from 'puppeteer';
import sharp from "sharp";
import { getEmailsHTMLBody, getSenders, updateEmail, upsertEmail, upsertEmailScreenshot, upsertSender } from './utils/queries';
import 'dotenv/config'

const { IMAP_USER, IMAP_APP_PWD, IMAP_HOST } = process.env;

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

  const fetchRange = `${from}:${to}`

  const imapReader = ImapReader.init(client, fetchRange)

  await imapReader.getMails()

  const results = imapReader.getResults()
    
  
    for await (let mail of results) {
      
      let parsed = await simpleParser(mail.source)
      let created_at = format(new Date(), 'yyyy-dd-MM hh:mm:ss')
      
      await upsertSender({
        name: mail.envelope.sender[0].name,
        address: mail.envelope.sender[0].address,
        created_at
      })
         
      const senders = await getSenders(mail.envelope.sender[0].address)
       
      await upsertEmail({ 
        uid: mail.uid,
        subject: mail.envelope.subject,
        sender_id: senders[0].id,
        recipients: mail.envelope.to.map(({ address }: { address: string }) => address),
        date: mail.envelope.date,
        received_date: mail.envelope.date,
        size: mail.size,
        body: parsed.text,
        body_html: parsed.html,
        created_at
      })

    }

    console.log(`${results.length} mails inserted.`)
}

async function generateScreenshots () {
  const browser = await puppeteer.launch()
  const screenShotmaker = ScreenshotMaker.init(browser)

  const data = await getEmailsHTMLBody()
    
  for await ( let { id, body_html } of data) {
    const screenshot = await screenShotmaker.takeScreenshot(body_html as string)
    let created_at = format(new Date(), 'yyyy-dd-MM hh:mm:ss')

    const webpBuffer = await sharp(screenshot).webp({ quality: 80 }).toBuffer()

    await upsertEmailScreenshot({
      created_at,
      base_64: `data:image/webp;base64,${webpBuffer.toString("base64")}`,
      email_id: id
    })

    await updateEmail({ screenshot_id: data![0].id }, id)

  }
}

async function main () {
  try {

    //await fetchMails("1", "100")
    await generateScreenshots()
    
    console.log("Done.")
    process.exit(0)

  } catch (error: unknown) {
    console.error('ERROR - ', error)
    process.exit(1)
  }

}

main()
