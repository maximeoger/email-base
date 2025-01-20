export interface ScreenshotMakerMethods {
  takeScreenshot: (html: string) => Promise<Uint8Array>;
}
