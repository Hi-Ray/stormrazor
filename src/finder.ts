import fs from "fs-extra"
import logger from "logger"
import path from "path"

/**
 * filters the correct files from the potential files
 *
 * @param potentialFiles
 * @returns the found files
 */
export const findFiles = (exportDir: string, potentialFiles: string[]): string[] => {
  // iterate over each potential file
  let foundFiles = potentialFiles
    .filter(file => /(\.[a-z].*)/.test(file))
    .filter(file => !file.startsWith('http://') && !file.startsWith('https://'))

  fs.writeFile(path.join(exportDir, 'files.txt'), foundFiles.join('\n'))
  foundFiles = foundFiles.filter(file => file.includes('?'))

  // log amount of found files

  logger.info(`Found ${foundFiles.length} potential assets files.`)
  return foundFiles.filter(file => file.includes('?'))
}
