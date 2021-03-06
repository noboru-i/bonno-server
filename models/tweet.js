'use strict';

const Twitter = require('twitter');

const redis_client = require('../db/redis-client').redis_client;

class Tweet {

  constructor(io) {
    this.io = io;
    this.client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    this.bot_client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.BOT_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
    });
  }

  start_stream() {
    const io = this.io;
    const client = this.client;
    const bot_client = this.bot_client;
    const start_stream = this.start_stream;

    this.client.stream('statuses/filter', {track: '煩悩'}, function(stream) {
      stream.on('data', function(tweet) {
        console.log(JSON.stringify(tweet));
        console.log('received: ' + tweet.id_str);
        if (tweet.retweeted_status || tweet.quoted_status) {
          console.log('ignore retweet');
          return;
        }

        bot_client.post('statuses/update', {status: '登録されました http://www.bonno.xyz/ ' + 'https://twitter.com/' + tweet.screen_name + '/status/' + tweet.id_str},  function(error, tweet, response){
          console.log('statuses/update complete');
          console.log(tweet);  // Tweet body.
          console.log(response);  // Raw response object.
        });

        const id_str = tweet.id_str;
        client.get('statuses/oembed', {id: id_str, maxwidth: 320, omit_script: true, hide_media: true, hide_thread: true}, function(error, tweet){
          if(error) {
            throw error;
          }

          // key:    gedatsu
          // score:  gedatsu time
          // member: {id, html}

          console.log('success statuses/oembed');
          const send_data = {
            id: id_str,
            html: tweet.html
          };

          const args = [ 'bonno', id_str, JSON.stringify(send_data) ];
          console.log(JSON.stringify(args));
          redis_client.zadd(args, function (err) {
            if (err) throw err;
          });

          io.emit('add_tweet', JSON.stringify(send_data));
        });
      });

      stream.on('error', function(error) {
        console.log(error);
        setTimeout(function() {
          console.log('retry start_stream');
          start_stream();
        }, 3000);
      });
    });
  }

  start_bot() {
    const messages = [
      '寿司食べたい',
      '年末ジャンボが当たりますように',
      'かのじょほしい',
      'バスケがしたいです',
      'デートしたい',
      '景気がよくなれ！',
      '志望校に受かれっ！',
      'いいね欲しい',
      'ラーメン食べたい',
      '痩せたい',
      '家建てたい',
      '車欲しい',
      'ニートになりたい',
      '結婚したい',
      '彼氏欲しい',
      'ずっと寝てたい'
    ];

    setInterval(function(){
      redis_client.zcard('bonno', function(err, count) {
        if (err) throw err;

        if (count < 3) {
          const index1 = Math.floor(Math.random() * messages.length);
          const index2 = Math.floor(Math.random() * messages.length);
          const index3 = Math.floor(Math.random() * messages.length);
          this.bot_client.post('statuses/update', {status: '#煩悩' + ' ' + messages[index1] + ' ' + messages[index2] + ' ' + messages[index3]},  function(error){
            if (error) {
              console.log(error);
            }
          });
        }
      });
    }, 2 * 60 * 1000);
  }
}

module.exports = Tweet;
