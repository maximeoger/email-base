import { Browser } from "puppeteer";
import { ScreenshotMakerMethods } from "../models/screenshot-maker";

export default class ScreenshotMaker implements ScreenshotMakerMethods {
  private browser: Browser;

  constructor (browser: Browser) {
    this.browser = browser;
  }

  static init (browser: Browser) {
    return new ScreenshotMaker(browser)
  }

  private async openNewPage (html: string) {
    const page = await this.browser.newPage()
    await page.setContent(html)

    return page
  }

  public async takeScreenshot (html: string) {
    const page = await this.openNewPage(html);

    const screenshot = await page.screenshot({
      encoding: 'base64'
    })

    return screenshot
  }
}