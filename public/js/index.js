/*global io*/

var socket = io();
socket.on('time', function (data) {
  data = JSON.parse(data);
  document.getElementById('time').innerText = data;
});

socket.on('add_tweet', function (data) {
  var li = document.createElement('li');
  li.innerHTML = JSON.parse(data);
  document.getElementById('prev_tweet').appendChild(li);
});
