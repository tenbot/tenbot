import { BotMiddleware } from './middleware';

/**
 * Message handler middleware
 *
 * 消息处理器
 */
export const middlewareMessageHandler = new BotMiddleware({
  factory: bot => async (ctx, next): Promise<void> => {
    // get the message and type
    // 获取信息和类型
    const { message } = ctx.state;
    const { msgType } = message;

    // create the message context
    // 创建信息上下文
    const context = bot.createContext(message);

    // emit message events
    // 触发信息事件
    bot.emit('message', message, context);
    bot.emit(`message/${msgType}`, message, context);

    // if the message type does not have handler, fallback to default handler
    const handlerType = bot.messageHandlers.has(msgType) ? msgType : 'default';
    // get corresponding handler
    const handler = bot.messageHandlers.get(handlerType);

    if (handler) {
      if (bot.directReply) {
        // if directReply mode is enabled, await until the handler resolved
        // 如果 directReply 模式开启，则等待处理器完成后再回复消息
        await handler(message, context);

        // save the direct reply message to state
        // 将直接回复的信息存入 state
        ctx.state.replyMessage = context.replyMessage;
      } else {
        // if directReply mode is disabled, do not await the handler
        // 如果 directReply 模式关闭，则不必等待处理器完成
        handler(message, context).catch(err => {
          bot.emit('error', err);
          bot.emit('error/message-handler', err, message, context);
          bot.emit(`error/message-handler/${msgType}`, err, message, context);
          bot.debug(err);
        });
      }
    }

    await next();
  },
});
