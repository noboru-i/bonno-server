const http = require('http');
const express = require('express');
const ws_start = require('./controllers/ws').ws_start;

require('dotenv').load();

const app = express();
const port = process.env.PORT || 5000;

var server = http.createServer(app);

console.log('http server listening on %d', port);

app.use(express.static(__dirname + '/public/'));
ws_start(server);

const Tweet = require('./models/tweet.js');
console.log(Tweet);
// new Tweet().start_stream();

server.listen(port);
