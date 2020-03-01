import { xmlParse } from '@tenbot/utils';
import { EncryptedWechatMessage } from '../wechat';
import { BotMiddleware } from './middleware';

/**
 * Verify if a request is sent from Wechat Work, and save encrypted message into state
 *
 * 验证请求是否来自企业微信，并将加密信息存入 state
 */
export const middlewareVerification = new BotMiddleware({
  method: ['get', 'post'],
  factory: bot => async (ctx, next): Promise<void> => {
    try {
      let encryptedMessage: string;
      const { msg_signature: signature, timestamp, nonce, echostr } = ctx.query;

      bot.debug(`${ctx.method} - ${ctx.path}${ctx.search}`);

      if (ctx.method === 'GET' && echostr) {
        // if echostr exists, use it as the encrypted message
        // 如果 echostr 存在，直接作为加密信息
        encryptedMessage = echostr;
      } else if (ctx.method === 'POST') {
        // get encrypted XML from request body
        // 从请求 body 中获取加密的 XML
        const encryptedXml: string = await new Promise(resolve => {
          let data = '';
          ctx.req.on('data', chunk => (data += chunk));
          ctx.req.on('end', () => {
            resolve(data);
          });
        });

        // get the encrypted message from the XML 'encrypt' field
        // 从加密的 XML 的 encrypt 字段中获取加密信息
        const {
          xml: { encrypt },
        } = await xmlParse<EncryptedWechatMessage>(encryptedXml);

        encryptedMessage = encrypt;
      } else {
        bot.debug('invalid request');
        ctx.status = 400;
        return;
      }

      // verify signature
      // 校验签名
      const isVerified =
        bot.cipher.signature({
          timestamp,
          nonce,
          encryptedMessage,
        }) === signature;

      if (!isVerified) {
        bot.debug('signature mismatch');
        ctx.status = 403;
        return;
      }

      // save encrypted message to state
      // 将加密信息存入 state
      ctx.state.encryptedMessage = encryptedMessage;
    } catch (err) {
      bot.debug(err);
      ctx.status = 400;
      return;
    }

    // Verified, enter next middleware
    // 验证成功，进入后续中间件
    await next();
  },
});
