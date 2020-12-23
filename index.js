const express = require('express')
const app = express()
const path = require('path')
const port = 3000

function getEncoded() {
  const { USR, PWD, DUMMY_USR, DUMMY_PWD } = process.env
  return {
    real: encode(USR, PWD),
    dummy: encode(DUMMY_USR, DUMMY_PWD),
  }
}

function encode(username, password) {
  return Buffer.from(`${username}:${password}`).toString('base64')
}


app.set("view engine", "pug")
app.set("views", path.join(__dirname, "views"))
app.use(express.static('public'))
app.get('/data', function(req, res) {
  const encoded = 
  res.json(getEncoded())
})
app.get('/auth', function(req, res) {
  const input = req.query.token
  if(input === getEncoded().real) {
    return res.json({
      redirect: '/thisisthegift'
    })
  }
  if(input === getEncoded().dummy) {
    return res.json({
      error: "Oh nonono... It's not that easy young padawan."
    })
  }
})
app.get('/', function (req, res) {
  res.render('index')
})
app.get('/thisisthegift', function (req, res) {
  res.render('gift', { coupon: process.env.COUPON })
})

app.listen(port, () => {
  console.log(`Hack your gift at port ${port}`)
})