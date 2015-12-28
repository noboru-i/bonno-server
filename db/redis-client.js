const redis_config = require('../config/redis.js').redis_config;
const redis = require('redis');

const redis_client = redis.createClient(redis_config['port'],
  redis_config['host'],
  {auth_pass: redis_config['password'], return_buffers: true});

exports.redis_client = redis_client;
