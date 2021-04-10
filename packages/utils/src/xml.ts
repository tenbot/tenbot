import * as xml2js from 'xml2js';

/**
 * Parse XML string to object
 */
export const xmlParse = <Content, XML = { xml: Content }>(
  xml: string,
  options?: xml2js.OptionsV2,
): Promise<XML> =>
  xml2js.parseStringPromise(xml, {
    explicitArray: false,
    tagNameProcessors: [xml2js.processors.firstCharLowerCase],
    ...options,
  });

/**
 * Build XML string from object
 */
export const xmlBuild = <T extends Record<never, never>>(
  obj: T,
  options?: xml2js.OptionsV2,
): string => {
  const builder = new xml2js.Builder({
    rootName: 'xml',
    headless: true,
    cdata: true,
    renderOpts: {
      pretty: false,
    },
    ...options,
  });

  return builder.buildObject(obj);
};
