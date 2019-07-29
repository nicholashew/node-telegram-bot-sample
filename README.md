# node-telegram-bot-sample

This is a Node.js application to demonstrate interact with official Telegram Bot API with [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api) library.

## Quick Start

Install dependencies:

```bat
npm install
```

Set the telegram bot `token` in the `index.js`.
Create a bot and token with [BotFather](https://core.telegram.org/bots#6-botfather) if you don't have one.

```js
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
```

Start the Bot app:

```bat
node index.js
```

To restart your Node.js Apps automatically we can use `nodemon`.

Installed globally to your system path.

```bat
npm install -g nodemon
```

Start the Bot app using `nodemon`

```bat
nodemon index.js
```

## Bot Command

Once the Bot app is running, you can talk to yor bot with the following commands:

- **message** - Bot will reply a message `Received message: {your_message}`
- **/ping** - Bot will reply a message with `pong`
- **/report {name}** - Bot will reply a greeting message and a `sample.txt` document.

## Reference

- [Telegram Bots](https://core.telegram.org/bots)
- [Telegram.org Bots API](https://core.telegram.org/bots/api)
- [Node.js Telegram Bot API](https://github.com/yagop/node-telegram-bot-api)
