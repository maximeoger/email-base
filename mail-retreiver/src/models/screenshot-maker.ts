export interface ScreenshotMakerMethods {
  takeScreenshot: (html: string) => Promise<string>
} 