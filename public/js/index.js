/*global io*/

var socket = io();
socket.on('msg', function (data) {
  console.log(data);
  var li = document.createElement('li');
  li.innerHTML = JSON.parse(data);
  document.querySelector('#pings').appendChild(li);
});
