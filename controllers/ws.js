exports.ws_start = function (server) {
  const io = require('socket.io')(server);
  io.on('connection', function(socket){
    var id = setInterval(function() {
      io.sockets.emit('msg', JSON.stringify(new Date()));
    }, 1000);
    // socket.on('event', function(data){});
    socket.on('disconnect', function(){
      console.log('websocket connection close');
      clearInterval(id);
    });
  });
};
