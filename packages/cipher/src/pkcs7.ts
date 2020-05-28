/**
 * PKCS7 decrypt
 *
 * @see https://tools.ietf.org/html/rfc5652#section-6.3
 */
export const decrypt = (input: Buffer, k = 32): Buffer => {
  const padding = input[input.length - 1];
  if (padding < 1 || padding > k) {
    return input;
  }
  return input.slice(0, input.length - padding);
};

/**
 * PKCS7 encrypt
 *
 * @see https://tools.ietf.org/html/rfc5652#section-6.3
 */
export const encrypt = (input: Buffer, k = 32): Buffer => {
  const padding = k - (input.length % k);
  return Buffer.concat([input, Buffer.alloc(padding, padding)]);
};
