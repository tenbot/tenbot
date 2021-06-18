import * as crypto from 'crypto';
import { encrypt as pkcs7Encrypt } from './pkcs7';

export type CipherEncrypt = (message: string, receiveId?: string) => string;

export const createCipherEncrypt =
  ({ aesKey, iv }: { aesKey: Buffer; iv: Buffer }): CipherEncrypt =>
  (message: string, receiveId = '') => {
    // generate 16 bytes random string
    const random = crypto.randomBytes(16);

    // generate 4 bytes message length
    const messageLength = Buffer.alloc(4);
    messageLength.writeUIntBE(message.length, 0, 4);

    // get buffered message
    const messageBuffer = Buffer.from(message);

    // get buffered receiveId
    const receiveIdBuffer = Buffer.from(receiveId);

    // concat message
    const plainMessage = pkcs7Encrypt(
      Buffer.concat([random, messageLength, messageBuffer, receiveIdBuffer]),
    );

    // generate encrypted message
    const decipher = crypto
      .createCipheriv('aes-256-cbc', aesKey, iv)
      .setAutoPadding(false);

    const aesEncryptedMessage = Buffer.concat([
      decipher.update(plainMessage),
      decipher.final(),
    ]);

    // base64 encode the message
    const base64EncodedMessage = aesEncryptedMessage.toString('base64');

    return base64EncodedMessage;
  };
