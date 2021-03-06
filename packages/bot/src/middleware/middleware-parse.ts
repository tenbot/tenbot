import type { WechatMessage } from '@tenbot/message';
import { xmlParse } from '@tenbot/utils';
import { createBotMiddleware } from './middleware';

/**
 * Parse the decrypted message that sent from Wechat Work, and save the message into state
 *
 * 解析解密后的信息，并将信息存入 state
 */
export const middlewareParse = createBotMiddleware({
  factory:
    (bot) =>
    async (ctx, next): Promise<void> => {
      // parse decrypted message
      // 解析解密后的信息
      const { xml: message } = await xmlParse<WechatMessage>(
        ctx.state.decryptedMessage,
      );

      bot.debug(
        `message - type: ${message.msgType} - from: ${
          message.from.alias
        } - content: ${JSON.stringify(message[message.msgType])}`,
      );

      // save message to state
      // 将信息存入 state
      ctx.state.message = message;
      await next();
    },
});
