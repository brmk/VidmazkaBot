// import Generator from './generator';
// import settings from './settings';
const Telegraf = require('telegraf')

const Generator = require('./generator')
const settings = require('../settings')

const N_EXCUSES = 3,
      CACHE_TIME = 3; //seconds


const getInlineResult = (str) => {
  return {
    id: String(Math.random()),
    type:'article',
    title: 'Відмаза',
    description: str,
    message_text:str
  }
}
const initBot = () => {
  const bot = new Telegraf(settings.BOT_TOKEN);

  // bot.use((ctx, next) => {
  //   const start = new Date()
  //   return next().then(() => {
  //     const ms = new Date() - start
  //     console.log('response time %sms', ms)
  //   })
  // })

  bot.start(({ reply }) => reply('Привіт! Пиши мені ім\'я людини, від якої треба відмазатись. Я щось придумаю'));

  bot.on('inline_query', ({ inlineQuery, answerInlineQuery }) => {
    const name = inlineQuery.query;
    const excuses = Array(N_EXCUSES).fill(null).map(()=>getInlineResult(Generator.generate(name)));
    const results = excuses;
    const options = {
      cache_time: CACHE_TIME
    };
    return answerInlineQuery(results, options);
  });

  bot.on('message', (ctx) => ctx.reply(Generator.generate(ctx.message.text)))

  bot.startPolling();
}



module.exports = initBot;
