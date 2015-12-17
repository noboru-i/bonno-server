/*global io*/

var socket = io.connect(location.origin);
socket.on('msg', function (data) {
  console.log(data);
  var li = document.createElement('li');
  li.innerHTML = JSON.parse(data);
  document.querySelector('#pings').appendChild(li);
});
