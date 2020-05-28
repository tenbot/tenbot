import * as crypto from 'crypto';

/**
 * Generate md5 hash
 */
export const hashMd5 = (str: crypto.BinaryLike): string =>
  crypto.createHash('md5').update(str).digest('hex');

/**
 * Generate sha1 hash
 */
export const hashSha1 = (str: crypto.BinaryLike): string =>
  crypto.createHash('sha1').update(str).digest('hex');
