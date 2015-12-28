const redis_config = require('../config/redis.js').redis_config;
const redis = require('redis');

const redis_client = redis.createClient(redis_config['port'],
  redis_config['host'],
  {auth_pass: redis_config['password'], return_buffers: true});

exports.ws_start = function (io) {
  io.on('connection', function(socket){
    console.log('websocket connection open');

    redis_client.zrangebyscore('bonno', '-inf', '+inf', function (err, response) {
      if (err) throw err;
      console.log('start forEach');
      const bonnos = [];
      response.forEach(function(elm) {
        console.log(elm.toString());
        bonnos.push(JSON.parse(elm.toString()));
      });
      console.log('end forEach');
      socket.emit('init_bonnos', JSON.stringify(bonnos));
    });

    socket.on('kane-wo-tsuita', function() {
      const redis_client = redis.createClient(redis_config['port'],
        redis_config['host'],
        {auth_pass: redis_config['password'], return_buffers: true});
      redis_client.zremrangebyrank('bonno', -1, -1, function (err) {
        if (err) throw err;
      });

      io.emit('gedatsu', JSON.stringify({}));
    });

    socket.on('disconnect', function(){
      console.log('websocket connection close');
    });
  });
};
