/*global io,twttr*/

var socket = io();
socket.on('time', function (data) {
  data = JSON.parse(data);
  document.getElementById('time').innerText = data;
});

socket.on('add_tweet', function (data) {
  data = JSON.parse(data);

  var div = document.createElement('div');
  div.id = 'hoge_' + data.id;
  div.innerHTML = data.html;
  document.getElementById('prev_tweet').appendChild(div);
  twttr.widgets.load();
});
