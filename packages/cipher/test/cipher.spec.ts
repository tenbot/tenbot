import { Cipher } from '@tenbot/cipher';

describe('@tenbot/cipher > Cipher', () => {
  const cipher = new Cipher({
    token: 'dwKeRLxHm6QJEge6zU',
    encodingAesKey: 's8zgLtxAfejeoSWW2SpseDIcEViK892hcPT9UQaMK7L',
  });
  const signature = '99dcace6359f5ef09f1890c1b649cc690d5420a7';
  const timestamp = '1582468957';
  const nonce = '1582952871';
  const encryptedMessage =
    'hBh9ANcu5FVgSCpBjzsTjsrdAsPujhvZ2KN/9UPmr732vifSkFeqnC8FCcKxqWDpT+XWfllGiS/g0fg97/FbeA==';
  const message = '5983602130328199135';
  const receiveId = '';

  describe('signature', () => {
    it('should get correct signature', () => {
      expect(
        cipher.signature({
          timestamp,
          nonce,
          encryptedMessage,
        })
      ).toBe(signature);
    });
  });

  describe('decrypt', () => {
    it('should get correct decrypted message', () => {
      expect(cipher.decrypt(encryptedMessage)).toEqual({
        message,
        receiveId,
      });
    });
  });

  describe('encrypt', () => {
    it('should get correct encrypted message', () => {
      const encryptedMessageWithRandom = cipher.encrypt(message, receiveId);
      expect(cipher.decrypt(encryptedMessageWithRandom)).toEqual({
        message,
        receiveId,
      });
    });
  });
});
