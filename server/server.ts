// var express = require('express'),
//     path = require('path'),
//     routes = require('./conf/routes.js'),
//     config = require('./conf/config.js'),
// 	bodyParser = require('body-parser'),
// 	cookieParser = require('cookie-parser'),
// 	cookieSession = require('cookie-session'),
//     app = express()

// app.use(express.static(path.join(__dirname, '../public')))
// app.use(bodyParser.json())
// app.use(cookieParser())
// app.use(cookieSession({
//   	name: 'session',
// 	httpOnly: false,
//   	keys: ['key1', 'key2']
// }))

// routes(app)
// console.log('listen port ' + config.port)
// app.listen(config.port)


var http = require('http')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var cookieSession = require('cookie-session')

import terminal = require('./service/terminal')

import { routes } from './conf/routes'
import { port } from './conf/config'

let app = express()

app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cookieSession({
  	name: 'session',
	httpOnly: false,
  	keys: ['key1', 'key2']
}))

routes(app)

// app.listen(port)



var server = http.createServer(app)

server.listen(port)


console.log('listen port ' + port)

terminal(server)

declare function require(name:string);
