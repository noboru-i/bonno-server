exports.ws_start = function (io) {
  io.on('connection', function(socket){
    var id = setInterval(function() {
      io.emit('msg', JSON.stringify(new Date()));
    }, 1000);
    // socket.on('event', function(data){});
    socket.on('disconnect', function(){
      console.log('websocket connection close');
      clearInterval(id);
    });
  });
};
