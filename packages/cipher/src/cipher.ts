import * as crypto from 'crypto';
import { hashSha1 } from '@tenbot/utils';
import { pkcs7 } from './pkcs7';

export interface CipherOptions {
  token: string;
  encodingAesKey: string;
}

/**
 * Signature / Encrypt / Decrypt
 *
 * @see https://work.weixin.qq.com/api/doc/90000/90139/90968#%E5%8E%9F%E7%90%86%E8%AF%A6%E8%A7%A3
 */
export class Cipher {
  /**
   * Token that generated by wechat-work
   */
  private readonly token: string;

  /**
   * Used for cipher & decipher
   */
  private readonly aesKey: Buffer;

  /**
   * Used for cipher & decipher
   */
  private readonly iv: Buffer;

  constructor({ token, encodingAesKey }: CipherOptions) {
    this.token = token;
    this.aesKey = Buffer.from(`${encodingAesKey}=`, 'base64');
    this.iv = this.aesKey.slice(0, 16);
  }

  /**
   * Calculate signature
   */
  signature({
    timestamp,
    nonce,
    encryptedMessage,
  }: {
    timestamp: string;
    nonce: string;
    encryptedMessage: string;
  }): string {
    // sort and join: token, timestamp, nonce, encryptedMessage
    const sortedString = [this.token, timestamp, nonce, encryptedMessage]
      .sort()
      .join('');

    // SHA1 hash
    const signature = hashSha1(sortedString);

    return signature;
  }

  /**
   * Decrypt message
   *
   * 16 bytes: random string
   * 4 bytes: message length
   * {message length} bytes: message
   * {ending} bytes: receive id
   */
  decrypt(
    encryptedMessage: string
  ): {
    message: string;
    receiveId: string;
  } {
    // base64 decode the message
    const base64DecodedMessage = Buffer.from(encryptedMessage, 'base64');

    // aes decrypted the message
    const cipher = crypto
      .createDecipheriv('aes-256-cbc', this.aesKey, this.iv)
      .setAutoPadding(false);

    const aesDecryptedMessage = pkcs7.decrypt(
      Buffer.concat([cipher.update(base64DecodedMessage), cipher.final()])
    );

    // get message length from 16-20 bytes
    const messageLength = aesDecryptedMessage.slice(16, 20).readUIntBE(0, 4);

    // get message
    const message = aesDecryptedMessage
      .slice(20, 20 + messageLength)
      .toString();

    // get receive id
    const receiveId = aesDecryptedMessage.slice(20 + messageLength).toString();

    return {
      message,
      receiveId,
    };
  }

  /**
   * Encrypt message
   *
   * 16 bytes: random string
   * 4 bytes: message length
   * {message length} bytes: message
   * {ending} bytes: receive id
   */
  encrypt(message: string, receiveId = ''): string {
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
    const plainMessage = pkcs7.encrypt(
      Buffer.concat([random, messageLength, messageBuffer, receiveIdBuffer])
    );

    // generate encrypted message
    const decipher = crypto
      .createCipheriv('aes-256-cbc', this.aesKey, this.iv)
      .setAutoPadding(false);

    const aesEncryptedMessage = Buffer.concat([
      decipher.update(plainMessage),
      decipher.final(),
    ]);

    // base64 encode the message
    const base64EncodedMessage = aesEncryptedMessage.toString('base64');

    return base64EncodedMessage;
  }
}
