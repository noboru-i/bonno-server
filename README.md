# 煩悩サーバ

## heroku

```
heroku addons:create rediscloud:30
```

## How to run

### setting env

create .env file like below,

```
CONSUMER_KEY=foo_key
CONSUMER_SECRET=foo_secret
ACCESS_TOKEN_KEY=bar_key
ACCESS_TOKEN_SECRET=bar_secret
```

### run local

```
heroku local
```
