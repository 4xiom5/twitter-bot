# twitter-bot
A simple way to create a bot for Twitter using NodeJS

# How to use
## Configuration
First personalize the config file `config.json` in the folder `app`

**twitter_api** : Your Twitter tokens

**bot_account** : Your Twitter account without the "@"

**retweet_keywords** : A list of keywords, the bot will retweet any tweet containing one of this keywords. Leave empty if you don't want the bot to retweet anything.

**response_keywords** : A list of keywords, the bot will respond to any tweet containing one of this keywords. Leave empty if you don't want the bot to respond to anything.

**message** : The bot will respond with this message to any tweet containing one of the *response_keywords* keywords.
## Build
`npm run init`

## Start
`npm run start`
