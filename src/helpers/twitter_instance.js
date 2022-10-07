const { TwitterApi } = require("twitter-api-v2");

const twitterInstance = new TwitterApi(process.env.TWITTER_TOKEN);

module.exports = twitterInstance;