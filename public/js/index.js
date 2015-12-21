/*global io,twttr*/

var socket = io();

socket.on('add_tweet', function (data) {
  data = JSON.parse(data);

  var div = create_element(data);
  document.getElementById('bonno_tweet').appendChild(div);
  twttr.widgets.load();
});

socket.on('gedatsu', function(data){
  data = JSON.parse(data);

  // TODO get from data.id
  var elm = document.getElementById('bonno_tweet').firstChild;
  if (!elm) {
    return;
  }
  var json = {
    id: elm.dataset.id,
    html: elm.dataset.html
  };
  var offset = elm.getBoundingClientRect().left - document.getElementById('gedatsu_tweet').getBoundingClientRect().left;
  elm.style.transform = 'translateX(-' + offset + 'px)';
  elm.style.transition = 'transform 1s';
  setTimeout(function() {
    var div = create_element(json);
    document.getElementById('gedatsu_tweet').insertBefore(div, document.getElementById('gedatsu_tweet').firstChild);
    document.getElementById('bonno_tweet').removeChild(elm);
    twttr.widgets.load();
  }, 1000);
});

function create_element(data) {
  var div = document.createElement('div');
  div.id = 'hoge_' + data.id;
  div.innerHTML = data.html;
  div.dataset.id = data.id;
  div.dataset.html = data.html;
  return div;
}

document.getElementsByClassName('dialog_background')[0].onclick = function() {
  this.style.display = 'none';
  document.getElementsByClassName('tutorial-dialog')[0].style.display = 'none';
};
