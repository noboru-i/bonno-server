exports.ws_start = function (io) {
  io.on('connection', function(socket){
    console.log('websocket connection open');

    socket.on('disconnect', function(){
      console.log('websocket connection close');
    });
  });
};
