const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const router = require('./router')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true })
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))
router(app)

const port = process.env.PORT || 3090

// below can be shorthanded to app.listen(port, ...)
const server = http.createServer(app)
server.listen(port, () => console.log(`Listening on port: ${port}`))
