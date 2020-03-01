import { xmlParse, xmlBuild } from '@tenbot/utils';

describe('@tenbot/utils > xml', () => {
  describe('xmlParse', () => {
    it('should parse xml string to object correctly', async () => {
      expect(await xmlParse('<xml><Foo>bar</Foo></xml>')).toEqual({
        xml: {
          foo: 'bar',
        },
      });
    });
  });

  describe('xmlBuild', () => {
    it('should build xml string from object correctly', () => {
      expect(
        xmlBuild({
          Foo: 'bar',
        })
      ).toEqual('<xml><Foo>bar</Foo></xml>');
    });
  });
});
