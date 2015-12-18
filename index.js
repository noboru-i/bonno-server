const http = require('http');
const express = require('express');
const ws_start = require('./controllers/ws').ws_start;

require('dotenv').load();

const app = express();
const port = process.env.PORT || 5000;

var server = http.createServer(app);
const io = require('socket.io')(server);
const redis = require('socket.io-redis');
io.adapter(redis({ host: 'localhost', port: 6379 }));

console.log('http server listening on %d', port);

app.use(express.static(__dirname + '/public/'));
ws_start(io);

const Tweet = require('./models/tweet.js');
new Tweet().start_stream();

server.listen(port);
