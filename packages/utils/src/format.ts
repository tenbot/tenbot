export function formatPath(str: string): string {
  return str.replace(/\/?$/, '').replace(/^\/?/, '/');
}
