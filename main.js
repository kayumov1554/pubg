const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

const token = "7116379634:AAEFfXsLTml5I9BQ7_Mh-xFij4CkjoS7_t0";
const bot = new TelegramBot(token, { polling: true });

app.get("/", (req, res) => {
  res.send("Telegram bot is running");
});

bot.onText(/\/start|\/help/, (msg) => {
  const welcomeMessage = `
    <b>Assalomu aleykum Xush Kelibsiz!</b>
    
    <b>Botimizdan foydalanish Bepul</b>

    <b>UC narxlari</b> 
    <b></b>
    <b>UC Lobbilar</b>
    <b></b>
    <b>Konkurslar</b>
    <b></b>
    <b>Bizni Kuzatib Boring</b>

    <b>Kanalimiz sslikasi👇</b>
  `;

  const options = {
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "UC narxlar", callback_data: "uc" },
          { text: "Kanalimiz", url: "https://t.me/musapubgm" },
        ],
      ],
    },
  };

  bot.sendMessage(msg.chat.id, welcomeMessage, options).then((sentMessage) => {
    // Save the message ID to edit it later
    bot.on("callback_query", (callbackQuery) => {
      const msg = callbackQuery.message;
      const data = callbackQuery.data;
      const chatId = msg.chat.id;
      const messageId = sentMessage.message_id;

      if (data === "uc") {
        const ucPrices = [
          { uc: "60-UC", price: "12.000 so'm" },
          { uc: "120-UC", price: "25.000 so'm" },
          { uc: "180-UC", price: "38.000 so'm" },
          { uc: "350-UC", price: "55.000 so'm" },
          { uc: "600-UC", price: "100.000 so'm" },
          { uc: "900-UC", price: "150.000 so'm" },
          { uc: "1240-UC", price: "270.000 so'm" },
          { uc: "1870-UC", price: "350.000 so'm" },
        ];

        const message =
          "<b>MUSAA_PUBG_UC narxlari</b>\n\n" +
          ucPrices
            .map(
              (price) =>
                `<pre>${price.uc.padEnd(10)}: ${price.price.padStart(10)}</pre>`
            )
            .join("\n");

        bot
          .editMessageText(message, {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: "HTML",
            reply_markup: {
              inline_keyboard: [
                [{ text: "Sotib olish", url: "https://t.me/kayumov_1554" }],
              ],
            },
          })
          .then(() => {
            const cardInfo = `
              <b>CARD INFO</b>
              <pre>CARD-4046320002166858</pre>
              <pre>Ism-MuhammadSodiq</pre>
              <pre>Familiya-Kayumov</pre>
            `;
            bot.sendMessage(chatId, cardInfo, { parse_mode: "HTML" });
          });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
