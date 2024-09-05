import { ImapReaderMethods, ImapFlowClient } from "../models/imap-reader";

export default class ImapReader implements ImapReaderMethods {
  private client: ImapFlowClient;
  private results: any[] = []

  constructor (connection:ImapFlowClient) {
    this.client = connection;
  }

  static init (connection: ImapFlowClient) {
    return new ImapReader(connection)
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

  private async fetchMessages (from: string, to: string, query: Record<string, any>) {
    return await this.client.fetch(`${from}:${to}`, query)
  }

  private setResults (value: any) {
    this.results.push(value)
  }

  public getResults () {
    return this.results
  }

  public async getMails (from: string, to: string) {
   
    await this.connect()
    const lock = await this.getMailBox("INBOX")
    
    try {

      let messages = await this.fetchMessages(from, to, { 
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

      await this.logout()

      return this.getResults()
    
    } catch (error: unknown) {
      throw error as Error;
    } finally {
      lock.release()
    }
  }
}
