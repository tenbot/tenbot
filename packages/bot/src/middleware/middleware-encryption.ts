import { xmlBuild } from '@tenbot/utils';
import { Message } from '../messages';
import { BotMiddleware } from './middleware';

/**
 * Encrypt the message that is replying to Wechat Work
 *
 * 将要回复给企业微信的消息进行加密
 */
export const middlewareEncryption = new BotMiddleware({
  factory: bot => async (ctx): Promise<void> => {
    const { replyMessage } = ctx.state;

    if (replyMessage instanceof Message) {
      // if the bot replies a message directly, encrypt the message
      // 如果机器人直接回复了信息，对信息进行加密
      const encryptedMessage = bot.cipher.encrypt(replyMessage.toReplyString());
      const timestamp = `${Math.floor(Date.now() / 1000)}`;
      const nonce = Buffer.from(timestamp).toString('hex');
      const signature = bot.cipher.signature({
        timestamp,
        nonce,
        encryptedMessage,
      });
      ctx.set('content-type', 'application/xml');
      ctx.body = xmlBuild({
        Encrypt: encryptedMessage,
        MsgSignature: signature,
        TimeStamp: timestamp,
        Nonce: nonce,
      });
    } else {
      // if the bot does not reply a message directly
      // respond with an empty 200 OK to tell Wechat Work that the bot has received the message successfully
      // 如果机器人不直接回复信息
      // 则返回一个空的 200 OK 响应，告知企业微信：机器人已成功接收消息
      ctx.status = 200;
    }
  },
});
