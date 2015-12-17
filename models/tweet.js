'use strict';

var Twitter = require('twitter');

class Tweet {

  constructor() {
    this.client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
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
