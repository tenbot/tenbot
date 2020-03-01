import { BotMiddleware } from './middleware';

/**
 * Handle the "Verify URL" request from Wechat Work
 *
 * 处理企业微信的验证机器人接收信息 URL 请求
 */
export const middlewareVerifyUrl = new BotMiddleware({
  method: 'get',
  factory: () => async (ctx): Promise<void> => {
    // return the decrypted message back directly to verify the bot url
    const { decryptedMessage } = ctx.state;
    ctx.body = decryptedMessage;
  },
});
