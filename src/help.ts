const printHelp = (VERSION: string, LICENSE: string) => {
  console.log('\n\n')


  console.log(`CommunityDragon LCU Frontpage Scrapper`)
  console.log(`Version: ${VERSION}`)
  console.log(`Made by: Ray<dev@hiray.me>`)
  console.log(`License: ${LICENSE}`)


  console.log('\n\n')


  console.log('--help -h    : Displays this help message.')
  console.log('--version    : Displays the current version of the scraper.')
  console.log('--verbose -v : Increases logging amount to console.')
  console.log('--url -u     : The path to the front page dist.')

  console.log('\n\n')

  process.exit(0)
}

export default printHelp
