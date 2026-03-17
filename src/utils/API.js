import { getAccessToken } from '../services/auth.service';

const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';
const SITE_CODE = 'lermao';

const sanitizeRequestBody = (data) => {
  if (typeof data !== 'object' || data === null) return data;

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeRequestBody(item));
  }

  const sanitized = {};
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string') {
      sanitized[key] = data[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    } else if (Array.isArray(data[key])) {
      sanitized[key] = data[key].map((item) => sanitizeRequestBody(item));
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      sanitized[key] = sanitizeRequestBody(data[key]);
    } else {
      sanitized[key] = data[key];
    }
  });
  return sanitized;
};

const sanitizeResponseData = (data) => {
  if (typeof data !== 'object' || data === null) return data;

  if (Array.isArray(data)) {
    return data;
  }

  const sanitized = {};
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string') {
      sanitized[key] = data[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    } else if (Array.isArray(data[key])) {
      sanitized[key] = data[key];
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      sanitized[key] = sanitizeResponseData(data[key]);
    } else {
      sanitized[key] = data[key];
    }
  });
  return sanitized;
};

export const API = {
  request: async ({ url, method = 'GET', params = {}, cache = undefined }) => {
    try {
      if (!url.startsWith('/api/')) {
        throw new Error('Invalid API endpoint');
      }

      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-Site-Code': SITE_CODE,
          Accept: 'application/json'
        },
        credentials: 'include'
      };

      const token = getAccessToken();
      if (token && typeof token === 'string' && token.length > 10) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      let fullUrl = `${BASE_URL}${url}`;

      if (method === 'GET' && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && typeof key === 'string') {
            const sanitizedValue = String(value).replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            searchParams.append(key, sanitizedValue);
          }
        });
        fullUrl += '?' + searchParams.toString();
      } else if (method !== 'GET' && Object.keys(params).length > 0) {
        config.body = JSON.stringify(sanitizeRequestBody(params));
      }

      const response = await fetch(fullUrl, config);

      if (response.status === 401) {
        const { authService } = await import('../services/auth.service');
        const refreshResult = await authService.refreshToken();

        if (refreshResult && refreshResult.access_token) {
          config.headers['Authorization'] = `Bearer ${refreshResult.access_token}`;
          const retryResponse = await fetch(fullUrl, config);

          if (!retryResponse.ok) {
            const errorData = await retryResponse.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${retryResponse.status}`);
          }

          const data = await retryResponse.json();
          return sanitizeResponseData(data);
        } else {
          if (typeof window !== 'undefined') {
            window.location.href = '/dang-nhap';
          }
          return null;
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return sanitizeResponseData(data);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('API Error:', error);
      }
      throw error;
    }
  },

  get: (url, params = {}) => API.request({ url, method: 'GET', params }),
  post: (url, params = {}) => API.request({ url, method: 'POST', params }),
  put: (url, params = {}) => API.request({ url, method: 'PUT', params }),
  patch: (url, params = {}) => API.request({ url, method: 'PATCH', params }),
  delete: (url, params = {}) => API.request({ url, method: 'DELETE', params })
};

export const setAuthFunctions = (getToken, refreshToken) => {
  console.warn('setAuthFunctions is deprecated.');
};

export const getCurrentToken = () => {
  return getAccessToken();
};
