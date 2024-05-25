const TelegramBot = require('node-telegram-bot-api');

const token = '6310109803:AAHUt4ZUHhqyqrG4Ld50A6gb4LxGZgE8LXQ';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Choose an option:', {
    reply_markup: {
      keyboard: [
        [{ text: 'My Profile' }],
        [{ text: 'Developer Info' }],
        [{ text: 'Hack Link' }]
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Received your user message: ${msg.text}`);
});

//You can implement your logic here okay?
