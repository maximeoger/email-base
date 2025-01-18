import { FetchMessageObject, FetchQueryObject } from "imapflow";
import { ImapReaderMethods, ImapFlowClient } from "../models/imap-reader";

export default class ImapReader implements ImapReaderMethods {
  private client: ImapFlowClient;
  private results: FetchMessageObject[] = [];
  private range: string;

  constructor (connection:ImapFlowClient, range: string) {
    this.client = connection;
    this.range = range;
  }

  /**
   * Init the ImapReader singleton
   * 
   * @param connection ImapFlowClient
   * @param range string
   * @returns ImarReader instance
   */
  static init (connection: ImapFlowClient, range: string) {
    return new ImapReader(connection, range)
  }

  /**
   * Init connexion to Imap remote client
   */
  private async connect () {
    await this.client.connect()
  }

  /**
   * Cut connexion to Imap remote client
   */
  private async logout () {
    await this.client.logout()
  }

  /**
   * 
   * @param mailbox The name of the mailbox in which the data comes from (ie: INBOX)
   * @returns 
   */
  private async getMailBox (mailbox: string) {
    return await this.client.getMailboxLock(mailbox)
  }

  /**
   * 
   * @param query Fetch emails within a range from QueryObject
   * @returns 
   */
  private async fetchMessages (query: FetchQueryObject) {
    return await this.client.fetch(this.range, query)
  }

  /**
   * Push a fetched message inside the ImapReader internal memory
   * @param value a FetchMessageObject
   */
  private setResults (value: FetchMessageObject) {
    this.results.push(value)
  }

  /**
   *  Move the fetched messages inside another mailbox, to avoid fetching the same messages again
   * @returns void
   */
  private async moveResults () {
    return await this.client.messageMove(this.range, "fetched")
  }

  /**
   * Return the results from ImapReader internal memory after a call to getMails() method
   * @returns 
   */
  public getResults () {
    return this.results
  }

  /**
   * Get emails from mailbox
   * @returns void
   */
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
