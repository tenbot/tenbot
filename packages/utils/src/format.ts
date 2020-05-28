export const formatPath = (str: string): string =>
  str.replace(/\/?$/, '').replace(/^\/?/, '/');
