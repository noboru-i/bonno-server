require('newrelic');
const http = require('http');
const express = require('express');
const ws_start = require('./controllers/ws').ws_start;
const redis_config = require('./config/redis.js').redis_config;
const redis_client = require('./db/redis-client').redis_client;

const app = express();
const port = process.env.PORT || 5000;

var server = http.createServer(app);

var redisApp = require('redis');
var socketpub = redisApp.createClient(redis_config['port'],
  redis_config['host'],
  {auth_pass: redis_config['password'], return_buffers: true});
var socketsub = redisApp.createClient(redis_config['port'],
  redis_config['host'],
  {auth_pass: redis_config['password'], return_buffers: true});

const io = require('socket.io')(server);
const redis = require('socket.io-redis');
io.adapter(redis({pubClient: socketpub, subClient: socketsub}));

console.log('http server listening on %d', port);

app.use(express.static(__dirname + '/public/'));
ws_start(io);

const Tweet = require('./models/tweet.js');
const tweet = new Tweet(io);
tweet.start_stream();
tweet.start_bot();

server.listen(port);

setInterval(function(){
  redis_client.zcard('bonno', function(err, count) {
    if (err) throw err;

    if (count > 10) {
      io.emit('kane-wo-tsuke');
    }
  });
}, 1000);
