const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('public'))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/html/index.html'));
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
