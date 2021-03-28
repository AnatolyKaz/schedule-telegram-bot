const { Telegraf, Markup } = require('telegraf');
const classes = require('./classes');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(
    `Привет ${ctx.message.from.first_name}.
Здесь ты можешь узнать свое расписание занятий!
Выбери день недели.`,
    Markup.keyboard([['пн', 'вт', 'ср', 'чт', 'пт']]).resize()
  )
);

function sortBy(dayOfWeek) {
  let outString = '';
  classes[dayOfWeek].forEach((obj) => {
    let str = `
Время: ${obj.time}
Предмет: ${obj.subject} ${obj.type}
Преподователь: ${obj.teacher}
Место проведения: ${obj.place}
Неделя: ${obj.week || 'по обеим неделям'}
`;
    outString = outString + str;
  });
  return outString;
}

bot.on('text', (ctx) => {
  switch (ctx.message.text) {
    case 'пн':
      return ctx.reply(sortBy(ctx.message.text));
    case 'вт':
      return ctx.reply(sortBy(ctx.message.text));
    case 'ср':
      return ctx.reply(sortBy(ctx.message.text));
    case 'чт':
      return ctx.reply(sortBy(ctx.message.text));
    case 'пт':
      return ctx.reply(sortBy(ctx.message.text));
    default:
      ctx.reply('Не понял');
  }
});

bot.launch();
