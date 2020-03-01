import { BotMiddleware } from './middleware';

/**
 * Decrypt the message that sent from Wechat Work, and save the decrypted message into state
 *
 * 将来自企业微信的信息进行解密，并将解密后的信息存入 state
 */
export const middlewareDecryption = new BotMiddleware({
  method: ['get', 'post'],
  factory: bot => async (ctx, next): Promise<void> => {
    // decrypt encrypted message
    // 将加密后的信息解密
    const { encryptedMessage } = ctx.state;
    const { message } = bot.cipher.decrypt(encryptedMessage);

    // save the decrypted message to state
    // 将解密后的信息存入 state
    ctx.state.decryptedMessage = message;
    await next();
  },
});
