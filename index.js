'use strict';
const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

// config variables
const config = require('./config/config.json');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.telegram_bot.token, { polling: true });

// sample document directory path
const documentDirectoryPath = path.join(__dirname, 'document');

// Listen to all message
bot.on('message', (msg) => {
  console.log(`Received message: ${msg.text}`);
  const chatId = msg.chat.id;

  if (/\/resource (.+)/.test(msg.text) || /\/ping($)/.test(msg.text)) {
    console.log('Ignore for command messages');
    return;
  }

  bot.sendMessage(chatId, 'Received message: ' + msg.text);
});

// Listen to message matches "/ping" exact string
bot.onText(/\/ping($)/, (msg) => {
  console.log(`Received command /ping`);
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'pong');
});

// Listen to message matches "/resource {resource_type}" 
bot.onText(/\/resource (.+)/, async (msg, match) => {
  console.log(`Received command /resource {resource_type}`);
  const chatId = msg.chat.id;
  const senderName = msg.from.first_name;
  const resourceType = match[1]; // the captured "resource_type"
  const filename = 'resource-' + resourceType + '-' + new Date().toISOString();
  const greet = getTimeGreeting();
  bot.sendMessage(chatId, `${greet} ${senderName}, attached resource ${resourceType} as requested.`);

  switch (resourceType) {
    case 'audio': {
      bot.sendAudio(chatId, 'https://sample-videos.com/audio/mp3/crowd-cheering.mp3');
      break;
    }
    case 'image': {
      const buffer = await fs.readFileSync(documentDirectoryPath + '/sample.jpg');
      bot.sendPhoto(chatId, buffer, { caption: filename });
      break;
    }
    case 'video': {
      bot.sendVideo(chatId, 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4');
      break;
    }
    case 'text': {
      const textBuffer = await fs.readFileSync(documentDirectoryPath + '/sample.txt');
      const fileOptions = {
        filename: filename + '.txt',
        contentType: 'application/octet-stream',
      };
      bot.sendDocument(chatId, textBuffer, {}, fileOptions);
      break;
    }
    default: {
      bot.sendMessage(chatId, `Invalid request, resource ${resourceType} is not available.`);
      break;
    }
  }
});

const getTimeGreeting = () => {
  const now = new Date();
  const hours = now.getHours();
  let greet;

  if (hours < 12)
    greet = 'Good Morning';
  else if (hours >= 12 && hours <= 17)
    greet = 'Good Afternoon';
  else if (hours >= 17 && hours <= 24)
    greet = 'Good Evening';

  return greet;
};
