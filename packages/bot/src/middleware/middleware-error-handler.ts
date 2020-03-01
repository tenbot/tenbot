import { BotMiddleware } from './middleware';

/**
 * Errors handler
 *
 * 错误处理器
 */
export const middlewareErrorHandler = new BotMiddleware({
  method: ['get', 'post'],
  factory: bot => async (ctx, next): Promise<void> => {
    try {
      await next();
    } catch (err) {
      // emit error events
      // 触发错误事件
      bot.emit('error', err);
      bot.emit('error/middleware', err, ctx);

      // TODO
      // apply the error handler of the bot
      // 调用机器人的错误处理器

      console.error(err);

      // reply an empty 200 to Wechat Work to avoid retrying
      // 回复一个空 200 ，避免企业微信重复发起请求
      ctx.status = 200;
    }
  },
});
