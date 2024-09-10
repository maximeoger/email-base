import { ImapReaderMethods, ImapFlowClient } from "../models/imap-reader";

export default class ImapReader implements ImapReaderMethods {
  private client: ImapFlowClient;
  private results: any[] = [];
  private range: string;

  constructor (connection:ImapFlowClient, range: string) {
    this.client = connection;
    this.range = range;
  }

  static init (connection: ImapFlowClient, range: string) {
    return new ImapReader(connection, range)
  }

  private async connect () {
    await this.client.connect()
  }

  private async logout () {
    await this.client.logout()
  }

  private async getMailBox (mailbox: string) {
    return await this.client.getMailboxLock(mailbox)
  }

  private async fetchMessages (query: Record<string, any>) {
    return await this.client.fetch(this.range, query)
  }

  private setResults (value: any) {
    this.results.push(value)
  }

  private async moveResults () {
    return await this.client.messageMove(this.range, "fetched")
  }

  public getResults () {
    return this.results
  }

  public async getMails () {
   
    await this.connect()
    const lock = await this.getMailBox("ready")
    
    try {

      let messages = await this.fetchMessages({ 
        envelope: true,
        uid: true,
        source: true,
        size: true,
        internalDate: true,
        headers: true
      })

      for await (let message of messages) {
        this.setResults(message)
      }

      await this.moveResults();

      await this.logout()

      return this.getResults()
    
    } catch (error: unknown) {
      throw error as Error;
    } finally {
      lock.release()
    }
  }
}
