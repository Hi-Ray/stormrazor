import Tracer from 'tracer'

const logger = Tracer.colorConsole()

const imgFileFormats = ["png", "jpg", "jpeg", "gif", "webp", "tiff", "raw", "mov", "mp4", "webm", "svg"]



const findImages = (baseUrl: string, imgPathsArr?: RegExpMatchArray | null): string[] => {
  let foundImageFiles: string[] = [];

  // @ts-ignore
  for (let i=0; i < imgPathsArr?.length; i++) {
    for (let j=0; j<imgFileFormats.length; j++) {

      if (!(imgPathsArr) || imgPathsArr[i].includes(imgFileFormats[j])) {

        if (imgPathsArr) {

          if (!imgPathsArr[i].includes('.')) {
            continue
          }

          logger.trace(`Found: ${imgPathsArr[i]}`)
          foundImageFiles.push(imgPathsArr[i])
        }

      }

    }

  }

  logger.warn(`Found ${foundImageFiles.length} potential image files.`)



  return foundImageFiles
}

export default findImages
