import { gmail_v1, google, Auth } from "googleapis";

export default class GmailClient {
  client: gmail_v1.Gmail;

  constructor(auth: Auth.OAuth2Client) {
    this.client = google.gmail({ version: 'v1', auth });
  }

  /**
   * Retourne tous les emails qui ont le label donné (ex: "ready")
   * @param labelName: string
   */
  async getEmails(labelName: string): Promise<gmail_v1.Schema$Message[]> {
    try {
      const labelsRes = await this.client.users.labels.list({ userId: 'me' });
      const labels = labelsRes.data.labels || [];
      const labelFound = labels.find((l) => l.name === labelName);

      if (!labelFound || !labelFound.id) {
        throw new Error(`Label "${labelName}" introuvable.`);
      }

      const labelId = labelFound.id;

      let allMessages: gmail_v1.Schema$Message[] = [];
      let nextPageToken: string | undefined;

      do {
        const msgListRes = await this.client.users.messages.list({
          userId: 'me',
          labelIds: [labelId],
          pageToken: nextPageToken,
          maxResults: 50,
        });

        if (msgListRes.data.messages) {
          allMessages = allMessages.concat(msgListRes.data.messages);
        }

        nextPageToken = msgListRes.data.nextPageToken || undefined;
      } while (nextPageToken);

      const fullMessages: gmail_v1.Schema$Message[] = [];
      for (const message of allMessages) {
        if (!message.id) continue;

        const msgRes = await this.client.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full',
        });

        if (msgRes.data) {
          fullMessages.push(msgRes.data);
        }

      }

      return fullMessages;
    } catch (err) {
      console.error(`Erreur dans getEmails("${labelName}"):`, err);
      throw err;
    }
  }
}