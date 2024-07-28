const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

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

  bot.sendMessage(msg.chat.id, welcomeMessage, options);
});

bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  const username = callbackQuery.from.username || "@MUSAAUC";

  if (data === "uc") {
    bot.deleteMessage(msg.chat.id, msg.message_id); // Welcome message ni o'chirish
    const ucPrices = `
<b>UC NARXLARI</b>

Biz ish faoliyatimizni boshladik @MUSAAUC
       
Boshqa UC hizmatlaridan bizning asosiy ajralib turadigan farqimiz bu - ✅ <b>TEZLIKDIR</b> ✅

🌐<b>Global versiya uchun 🆔 orqali:</b>

60 UC 13.000uzs - 99₽
120 UC 25.000uzs - 192₽
180 UC 36.000uzs - 275₽
355 UC 58.000uzs - 477₽
385 UC 69.000uzs - 530₽ 
720 UC 115.000uzs - 885₽ 
1075 UC 175.000uzs - 1350₽
1440 UC 228.000uzs - 1750₽
1950 UC 290.000uzs - 2230₽
2305 UC 340.000uzs - 2615₽
2670 UC 395.000uzs - 3040₽
4000 UC 570.000uzs -  4390₽
8400 UC 1.150.000uzs - 8850₽

➖➖➖➖➖➖

<b>✅ Login Parol orqali UC narxlari ✅</b>

🆔 orqali sotib olgandan ko'ra anchagina arzonga ko'proq UC olasiz.

3850 UC 495.000uzs - 3900
8100 UC 960.000uzs - 7400
16.200 UC 1.920.000uzs - 14800
24.300 UC 2.850.000uzs - 21950
👑 Undan ko'proq UC kerak bo'lsa kelishamiz ✔ 🤝
`;

    const options = {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [{ text: "Sotib olish", url: `https://t.me/${username}` }],
        ],
      },
    };

    bot.sendMessage(msg.chat.id, ucPrices, options);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// 7116379634:AAEFfXsLTml5I9BQ7_Mh-xFij4CkjoS7_t0
