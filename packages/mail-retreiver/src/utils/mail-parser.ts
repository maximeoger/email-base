import { gmail_v1 } from "googleapis";
import { Buffer } from "node:buffer";

interface ParsedEmail {
  id: string;
  subject?: string;
  from?: string;
  date?: string;
  htmlBody?: string;
}

export function parseFromHeader(fromValue: string) {

  const match = fromValue.match(/^(.*)<([^<>]+)>$/);
  if (!match) {
    return {
      name: "",
      address: fromValue.trim()
    };
  }

  const namePart = match[1].trim().replace(/^["']|["']$/g, '');
  const addressPart = match[2].trim();

  return {
    name: namePart,
    address: addressPart
  };
}

export default function parseEmails(messages: gmail_v1.Schema$Message[]): ParsedEmail[] {
  const parsed: ParsedEmail[] = [];

  for (const msg of messages) {
    if (!msg.id || !msg.payload) {
      continue;
    }

    const headers = msg.payload.headers || [];
    const subjectHeader = headers.find((h) => h.name === "Subject");
    const fromHeader = headers.find((h) => h.name === "From");
    const dateHeader = headers.find((h) => h.name === "Date");

    const htmlBody = findHtmlPart(msg.payload);

    parsed.push({
      id: msg.id,
      subject: subjectHeader?.value!,
      from: fromHeader?.value!,
      date: dateHeader?.value!,
      htmlBody,
    });
  }

  return parsed;
}

function findHtmlPart(part: gmail_v1.Schema$MessagePart): string | undefined {

  if (part.mimeType === "text/html" && part.body?.data) {
    return decodeBase64Url(part.body.data);
  }

  if (part.parts) {
    for (const subPart of part.parts) {
      const result = findHtmlPart(subPart);
      if (result) {
        return result;
      }
    }
  }

  return undefined;
}

function decodeBase64Url(data: string): string {
  const base64 = data.replace(/_/g, "/").replace(/-/g, "+");
  return Buffer.from(base64, "base64").toString("utf-8");
}
