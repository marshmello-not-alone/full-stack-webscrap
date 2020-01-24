const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

const scrapers = require('./scrapers');

app.use(bodyParser.json())

//custom middle to disable security rules for local development
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})

app.get('/creators', async(req, res) => {
  const creators = [
    {name: "omer", img: 'https://'},
    {name: "jiaqi", img: 'https://'},
    {name: "dylan", img: 'https://'},
  ]
  //todo: GET from DB
  res.send(creators)
})

app.post('/creators', async(req, res) => {
  console.log(req.body)
    const channelData = await scrapers.scrapeChannel(req.body.channelURL)
  console.log({channelData})
  // todo: Add to DB
  res.send('success')
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))