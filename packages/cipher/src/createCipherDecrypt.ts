import * as crypto from 'crypto';
import { decrypt as pkcs7Decrypt } from './pkcs7';

export type CipherDecrypt = (encryptedMessage: string) => {
  message: string;
  receiveId: string;
};

export const createCipherDecrypt =
  ({ aesKey, iv }: { aesKey: Buffer; iv: Buffer }): CipherDecrypt =>
  (encryptedMessage: string) => {
    // base64 decode the message
    const base64DecodedMessage = Buffer.from(encryptedMessage, 'base64');

    // aes decrypted the message
    const cipher = crypto
      .createDecipheriv('aes-256-cbc', aesKey, iv)
      .setAutoPadding(false);

    const aesDecryptedMessage = pkcs7Decrypt(
      Buffer.concat([cipher.update(base64DecodedMessage), cipher.final()]),
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
  };
