'use strict';

var Twitter = require('twitter');

class Tweet {

  constructor(io) {
    this.io = io;
    this.client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
  }

  start_stream() {
    const io = this.io;
    const client = this.client;

    this.client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
      stream.on('data', function(tweet) {
        console.log('received: ' + tweet.id_str);
        if (tweet.retweeted_status) {
          console.log('ignore retweet');
          return;
        }

        const id_str = tweet.id_str;
        client.get('statuses/oembed', {id: id_str, maxwidth: 320, omit_script: true, hide_media: true, hide_thread: true}, function(error, tweet){
          if(error) {
            throw error;
          }

          // TODO save
          // key:    bonno
          // score:  tweet time
          // member: {id, html}

          // key:    gedatsu
          // score:  gedatsu time
          // member: {id, html}

          console.log('success statuses/oembed');
          const send_data = {
            id: id_str,
            html: tweet.html
          };
          io.emit('add_tweet', JSON.stringify(send_data));
        });
      });

      stream.on('error', function(error) {
        console.log(error);
        setTimeout(function() {
          console.log('retry start_stream');
          this.start_stream();
        }, 3000);
      });
    });
  }
}

module.exports = Tweet;
