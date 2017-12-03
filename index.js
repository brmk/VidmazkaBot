const express = require('express')
const bodyParser = require('body-parser')
const bot = require('./src/bot')

const app = express()
app.set('port', (process.env.PORT || 8080))
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(bodyParser.json())
// index
app.get('/', function (req, res) {
 res.send('hello world i am a secret bot')
})
app.listen(app.get('port'), function() {
 console.log('running on port', app.get('port'))
})

bot();

module.exports = app;