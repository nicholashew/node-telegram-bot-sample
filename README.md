# node-telegram-bot-sample

This is a Node.js application to demonstrate interact with official Telegram Bot API with [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api) library.

## Quick Start

Install dependencies:

```bat
npm install
```

Configure the telegram bot `token` in the `./config/config.json`.
Create a bot and token with [BotFather](https://core.telegram.org/bots#6-botfather) if you don't have one.

```js
{
    "telegram_bot": {
        "token": "YOUR_TELEGRAM_BOT_TOKEN"
    }
}
```

Start the Bot app:

```bat
node index.js
```

(Optional) To restart your Node.js Apps automatically we can use `nodemon`.

Installed globally to your system path.

```bat
npm install -g nodemon
```

Start the Bot app using `nodemon`

```bat
nodemon index.js
```

## Bot Command

Once the Bot app is running, by the default the bot is listening to the event `message` for all the message.

To inform the Bot to do things, you can talk to the bot with the following commands:

- **/ping** - Bot will reply a message with `pong`
- **/resource {resource_type}** - Bot will reply a greeting message and document of `audio/image/video/text`. e.g:
  - `/resource audio`
  - `/resource image`
  - `/resource video`
  - `/resource text`

## Reference

- [Telegram Bots](https://core.telegram.org/bots)
- [Telegram.org Bots API](https://core.telegram.org/bots/api)
- [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api)
