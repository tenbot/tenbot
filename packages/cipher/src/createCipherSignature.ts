import { hashSha1 } from '@tenbot/utils';

export type CipherSignature = (opts: {
  timestamp: string;
  nonce: string;
  encryptedMessage: string;
}) => string;

export const createCipherSignature =
  ({ token }: { token: string }): CipherSignature =>
  ({ timestamp, nonce, encryptedMessage }) => {
    // sort and join: token, timestamp, nonce, encryptedMessage
    const sortedString = [token, timestamp, nonce, encryptedMessage]
      .sort()
      .join('');

    // SHA1 hash
    const signature = hashSha1(sortedString);

    return signature;
  };
