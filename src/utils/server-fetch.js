const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';
const SITE_CODE = 'lermao';

export async function serverFetch(path, options = {}) {
  const { headers = {}, ...restOptions } = options;

  const response = await fetch(`${API_DOMAIN}${path}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'X-Site-Code': SITE_CODE,
      ...headers
    },
    ...restOptions
  });

  return response;
}

export async function serverFetchJSON(path, options = {}) {
  const response = await serverFetch(path, options);

  if (!response.ok) {
    throw new Error(`API ${path} returned ${response.status}`);
  }

  return response.json();
}
