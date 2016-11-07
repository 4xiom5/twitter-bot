# twitter-bot
A simple way to create a bot for Twitter that can retweet and/or respond to tweets containing keywords.

# How to use
## Build
`npm run init`
## Configuration
To start the bot simply run the `npm run start` command.

Once this done, you can edit the config file `config.json` in the root folder.

Config file explanation : 

**twitter_api** : Your Twitter tokens

**bot_account** : Your Twitter account without the "@"

**retweet_keywords** : A list of keywords, the bot will retweet any tweet containing one of this keywords. Leave empty if you don't want the bot to retweet anything.

**response_keywords** : A list of keywords, the bot will respond to any tweet containing one of this keywords. Leave empty if you don't want the bot to respond to anything.

**message** : The bot will respond with this message to any tweet containing one of the *response_keywords* keywords.

## Start The bot
`npm run start`

## Licence
Provided under ISC Licence.