// import Generator from './generator';
// import settings from './settings';
const Telegraf = require('telegraf')

const Generator = require('./generator')
const settings = require('../settings')

const initBot = () => {
  console.log('Initializing Bot')
  const bot = new Telegraf(settings.BOT_TOKEN);

  bot.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log('response time %sms', ms)
    })
  })

  bot.start(({ reply }) => reply('Привіт! Пиши мені ім\'я людини, від якої треба відмазатись. Я щось придумаю'));

  bot.on('inline_query', ({ inlineQuery, answerInlineQuery }) => {
    const name = inlineQuery.query;
    const excuse = Generator.generate(name);
    const results = [{
      id: String(Math.random()),
      type:'article',
      title: 'Відмаза',
      description: excuse,
      message_text:excuse
    }];
    const options = {
      cache_time: 3 //3 seconds
    };
    return answerInlineQuery(results, options);
  });

  bot.on('message', (ctx) => ctx.reply(Generator.generate(ctx.message.text)))


  bot.startPolling();
}



module.exports = initBot;
