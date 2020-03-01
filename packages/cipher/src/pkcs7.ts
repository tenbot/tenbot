/**
 * PKCS7
 *
 * @see https://tools.ietf.org/html/rfc5652#section-6.3
 */
export const pkcs7 = {
  decrypt(input: Buffer, k = 32): Buffer {
    const padding = input[input.length - 1];
    if (padding < 1 || padding > k) {
      return input;
    }
    return input.slice(0, input.length - padding);
  },

  encrypt(input: Buffer, k = 32): Buffer {
    const padding = k - (input.length % k);
    return Buffer.concat([input, Buffer.alloc(padding, padding)]);
  },
};
