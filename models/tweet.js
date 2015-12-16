'use strict';

var Twitter = require('twitter');
const secret = require('../secret.json');

class Tweet {

  constructor() {
    this.client = new Twitter({
      consumer_key: secret.consumer_key,
      consumer_secret: secret.consumer_secret,
      access_token_key: secret.access_token_key,
      access_token_secret: secret.access_token_secret
    });
  }

  start_stream() {
    this.client.stream('statuses/filter', {track: 'javascript'}, function(stream) {
      stream.on('data', function(tweet) {
        console.log(tweet.text);
      });

      stream.on('error', function(error) {
        throw error;
      });
    });
  }
}

module.exports = Tweet;
