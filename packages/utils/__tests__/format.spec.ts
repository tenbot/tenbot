import { formatPath } from '@tenbot/utils';

describe('@tenbot/utils > format', () => {
  describe('formatPath', () => {
    it('should get "/" if pass empty string', () => {
      expect(formatPath('')).toBe('/');
    });

    it('should handle slash correctly', () => {
      expect(formatPath('foo')).toBe('/foo');
      expect(formatPath('/foo')).toBe('/foo');
      expect(formatPath('foo/')).toBe('/foo');
      expect(formatPath('/foo/')).toBe('/foo');
      expect(formatPath('foo/bar')).toBe('/foo/bar');
      expect(formatPath('/foo/bar')).toBe('/foo/bar');
      expect(formatPath('foo/bar/')).toBe('/foo/bar');
      expect(formatPath('/foo/bar/')).toBe('/foo/bar');
    });
  });
});
