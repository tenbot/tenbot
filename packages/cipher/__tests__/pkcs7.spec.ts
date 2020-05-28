import { decrypt, encrypt } from '@tenbot/cipher';

describe('@tenbot/cipher > pkcs7', () => {
  describe('decrypt', () => {
    it('should get correct pkcs7 decrypted buffer', () => {
      const size = 32;
      const input = Buffer.concat([
        Buffer.from([1, 2, 3, 4]),
        Buffer.alloc(28, 28),
      ]);
      const output = Buffer.from([1, 2, 3, 4]);
      expect(decrypt(input, size).equals(output)).toBe(true);
    });

    it('should return as is if the padding is not correct', () => {
      const size = 32;
      const input = Buffer.from([1, 2, 3, 99]);
      expect(decrypt(input, size).equals(input)).toBe(true);
    });
  });

  describe('encrypt', () => {
    it('should get correct pkcs7 encrypted buffer', () => {
      const size = 32;
      const input = Buffer.from([1, 2, 3, 4]);
      const output = Buffer.concat([
        Buffer.from([1, 2, 3, 4]),
        Buffer.alloc(28, 28),
      ]);
      expect(encrypt(input, size).equals(output)).toBe(true);
    });
  });
});
