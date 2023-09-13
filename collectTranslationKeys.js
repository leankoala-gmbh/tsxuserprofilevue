const fs = require('fs')
const locale = require('./src/locales/en.json')

const keysArray = Object.keys(locale)

fs.writeFile('./src/types/localeKeys.ts', `export type TLocaleKeys = ['${keysArray.join("', '")}'][number]`, function (err) {
  if (err) {
    return console.error(err)
  }
  console.log('Keys array has been saved to keys.js')
})
