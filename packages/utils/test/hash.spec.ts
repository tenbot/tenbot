import { hashMd5, hashSha1 } from '@tenbot/utils';

describe('@tenbot/utils > hash', () => {
  describe('md5', () => {
    it('should generate md5 hash correctly', () => {
      expect(hashMd5('foobar')).toBe('3858f62230ac3c915f300c664312c63f');
    });
  });

  describe('sha1', () => {
    it('should generate sha1 hash correctly', () => {
      expect(hashSha1('foobar')).toBe(
        '8843d7f92416211de9ebb963ff4ce28125932878'
      );
    });
  });
});
