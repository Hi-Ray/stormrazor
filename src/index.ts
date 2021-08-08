import exp from "constants";
import * as fs from "fs";
import path from "path";
import tracer from 'tracer'

import arg from 'arg'
import {DownloaderHelper as download} from 'node-downloader-helper'
import {Url} from "url";

import PrintHelp from './help'
import fileSearch from './images'

const VERSION = `1.0.0`
const LICENSE = `LGPL-3.0`

const logger = tracer.colorConsole()

let args;


try {
  args = arg({
    // Arg types
    '--help': Boolean,
    '--version': Boolean,
    '--verbose': Boolean,
    '--url': String,

    // Aliases
    '-v': '--verbose',
    '-h': '--help',
    '-u': '--url'
  })
} catch (e) {
  PrintHelp(VERSION, LICENSE)
}

if (args['--help'] === true) {
  PrintHelp(VERSION, LICENSE)
}

if (args['--verbose']) {
  tracer.setLevel('trace')
  logger.warn(`VERBOSE LOGGING ENABLED`)
} else {
  tracer.setLevel('warn')
}

if (args['--url']) {
  const Arg = args['--url']
  const BASEURL = path.dirname(Arg)
  const DistName = path.basename(Arg)

  logger.warn(`Using base url of`, BASEURL)

  if (!DistName.startsWith('dist.js')) {
    logger.error('Please provide the dist file of the frontpage')
    process.exit(0)
  }


  const dl = new download(Arg, '_tmp');

  dl.on('end', () => {
    logger.info('Downloaded dist file')

    const data = fs.readFileSync('./_tmp/dist.js',
        {encoding:'utf8', flag:'r'});

    const results = data.toString().match(/"([^"]*)"/g)

    logger.warn(`Found ${results?.length} potential files.`)


    const files = fileSearch(BASEURL, results)

    let exportedFiles: string[] = []

    files.forEach(file => {
      const imagePath = path.dirname(file)
      const exportPath = path.join(BASEURL, imagePath)
      logger.info(exportPath)

      try {
        fs.mkdirSync(path.join('out', path.dirname(exportPath) || './'), {recursive: true})
      } catch (e) {
        logger.warn(`out path already exists`)
      }

      const downloader = new download(new URL(file, BASEURL).toString(), path.join('out', path.dirname(exportPath) || './'))

      downloader.on('end', () => {
        logger.trace(`Downloaded file: ${file}`)
        exportedFiles.push(file);
      })

      downloader.start().catch(null)
    })


    try {
      fs.writeFileSync(path.join('out', 'exported.txt'), exportedFiles.join('\n'))
    } catch (e) {
      logger.error('exported.txt already exists')
    }

    fs.rmSync('tmp/dist.js')
  })

  dl.start().catch(logger.error)
}
 // /"([^"]*)"/g
