exports.ws_start = function (io) {
  io.on('connection', function(socket){
    console.log('websocket connection open');

    var id = setInterval(function(){
      io.emit('gedatsu', JSON.stringify({}));
    }, 5000);

    socket.on('disconnect', function(){
      console.log('websocket connection close');
      clearInterval(id);
    });
  });
};
