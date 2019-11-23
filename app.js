const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.use(express.static('public'))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
})

app.listen(port)