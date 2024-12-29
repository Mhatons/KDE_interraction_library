export function parseURLParams(url: string): Record<string, string> {
  const params = new URLSearchParams(url);
  const parsedParams: Record<string, string> = {};
  params.forEach((value, key) => {
    parsedParams[key] = value;
  });
  return parsedParams;
}

export function validateURLParams(params: Record<string, string>): boolean {
  if (!params['cookie']) {
    console.error('Missing required parameter: cookie');
    return false;
  }
  return true;
}
