import {DownloaderHelper as download} from 'node-downloader-helper'

const downloadFiles = (downloadArray: string) => {
  for (let i = 0; i < downloadArray.length; i++) {
    const dl = new download(downloadArray[i] , 'out');

  }

}
