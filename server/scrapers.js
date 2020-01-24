const puppeteer = require('puppeteer')

async function scrapeChannel(url) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)

  const [el] = await page.$x('/html/body/div[1]/section/main/div/header/section/div[1]/h1')
  const text = await el.getProperty('textContent')
  const name = await text.jsonValue()

  const [el2] = await page.$x('/html/body/div[1]/section/main/div/header/div/div/span/img')
  const src = await el2.getProperty('src')
  const avatarURL = await src.jsonValue()

  browser.close()

  console.log({name, avatarURL})

  return {name, avatarURL}
}

module.exports = {
    scrapeChannel
}