const url = require('url');

const config = get_config();

function get_config() {
  if (process.env.REDISCLOUD_URL) {
    return parse_rediscloud_url(process.env.REDISCLOUD_URL);
  }

  return { host: 'localhost', port: 6379 };
}

function parse_rediscloud_url(rediscloud_url) {
  const url_object = url.parse(rediscloud_url);
  return {
    host: url_object['host'],
    port: url_object['port'],
    password: url_object['auth'].split(':')[1]
  };
}

exports.redis_config = config;
