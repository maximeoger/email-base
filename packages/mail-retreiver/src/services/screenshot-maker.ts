import { Browser } from "puppeteer";
import sharp from "sharp";

export default class ScreenshotMaker {
  private browser: Browser;

  constructor(browser: Browser) {
    this.browser = browser;
  }

  static init(browser: Browser) {
    return new ScreenshotMaker(browser);
  }

  private async openNewPage(html: string) {
    const page = await this.browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle2" });

    return page;
  }

  public async takeScreenshot(html: string): Promise<Buffer> {
    const page = await this.openNewPage(html);

    const height = await (await page).evaluate(() => document.body.scrollHeight);
    const width = await (await page).evaluate(() => document.body.scrollWidth);

    await (await page).setViewport({ width, height });

    const screenshot = await (await page).screenshot({
      encoding: "binary",
      fullPage: true,
    });

    await (await page).close();

    const compressedBuffer = await sharp(screenshot)
    .webp({ quality: 80 })
    .toBuffer();

    return compressedBuffer;
  }
}