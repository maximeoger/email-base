const fs = require('node:fs/promises');

/**
 * You can use this function to save screenshots on disk, for testing purposes
 * @param filename 
 * @param buff 
 */
export default async function writeScreenshot (filename: string, buff: Buffer): Promise<void> {
  const filehandle = await fs.open(__dirname + `/screenshots/${filename}`, 'w')
  const stream = filehandle.createWriteStream();

  stream.write(buff)

  stream.on('finish', () => {
    console.timeEnd("writeMany")
    filehandle.close();
  })
}