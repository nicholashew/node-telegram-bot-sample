'use strict';

const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const path = require('path');

// config variables
const config = require('./config/config.json');

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(config.telegram_bot.token, { polling: true });

const documentDirectoryPath = path.join(__dirname, 'document');

// Listen to all message
bot.on('message', (msg) => {
  console.log(`Received message: ${msg.text}`);
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Received message: ' + msg.text);
});

// Listen to message matches "/ping" exact string
bot.onText(/\/ping($)/, (msg, match) => {
  console.log(`Received command /ping`);
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'pong');
});

// Listen to message matches "/report {reportName}" 
bot.onText(/\/report (.+)/, async (msg, match) => {
  console.log(`Received command /report {reportName}`);
  const chatId = msg.chat.id;
  const senderName = msg.from.first_name;
  const reportName = match[1]; // the captured "reportName"
  const greet = getTimeGreeting();
  bot.sendMessage(chatId, `${greet} ${senderName}, attached report ${reportName} as requested.`);

  const buffer = await fs.readFileSync(documentDirectoryPath + '/sample.txt');
  const fileOptions = {    
    filename: 'report-' + reportName + '-' + new Date().toISOString() + '.txt',
    contentType: 'application/octet-stream',
  };
  bot.sendDocument(chatId, buffer, {}, fileOptions);
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
