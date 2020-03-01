import * as xml2js from 'xml2js';

/**
 * Parse XML string to object
 */
export function xmlParse<Content, XML = { xml: Content }>(
  xml: string,
  options?: xml2js.OptionsV2
): Promise<XML> {
  return xml2js.parseStringPromise(xml, {
    explicitArray: false,
    tagNameProcessors: [xml2js.processors.firstCharLowerCase],
    ...options,
  });
}

/**
 * Build XML string from object
 */
export function xmlBuild(obj: object, options?: xml2js.OptionsV2): string {
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
}
