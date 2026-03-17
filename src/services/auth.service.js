import Cookies from 'js-cookie';
import { CK_CLIENT_USER } from '../utils/const';

const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';
const SITE_CODE = 'lermao';

const COOKIE_CONFIG = {
  expires: 7,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  domain: process.env.NODE_ENV === 'production' ? '.lermao.vn' : undefined
};

let currentAccessToken = null;

const setAccessToken = (token) => {
  currentAccessToken = token;
};
const getAccessToken = () => {
  return currentAccessToken;
};
const clearAccessToken = () => {
  currentAccessToken = null;
};

const clearAuthData = () => {
  const cookiesToClear = [CK_CLIENT_USER, 'csrf_token', 'lermao_client_token', 'refresh_token'];
  cookiesToClear.forEach((cookieName) => {
    if (cookieName && typeof cookieName === 'string') {
      try {
        Cookies.remove(cookieName, COOKIE_CONFIG);
        Cookies.remove(cookieName, { path: '/' });
        Cookies.remove(cookieName);
      } catch (error) {
        console.warn(`Failed to remove cookie ${cookieName}:`, error);
      }
    }
  });
  clearAccessToken();
};

const sanitizeUserData = (user) => {
  if (!user || typeof user !== 'object') return user;
  return {
    client_id: user.client_id,
    full_name: (user.full_name || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
    email: (user.email || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
    phone: (user.phone || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
    detailed_address: (user.detailed_address || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
    province: (user.province || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
    district: (user.district || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
    ward: (user.ward || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  };
};

const baseHeaders = (extraHeaders = {}) => ({
  'Content-Type': 'application/json',
  'X-Site-Code': SITE_CODE,
  ...extraHeaders
});

export const authService = {
  register: async (data) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: baseHeaders(),
      body: JSON.stringify({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        pass_word: data.pass_word
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return await response.json();
  },

  verifyEmail: async (email, code) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/verify-email`, {
      method: 'POST',
      credentials: 'include',
      headers: baseHeaders(),
      body: JSON.stringify({ email, code })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Verification failed');
    }

    const data = await response.json();

    if (data.access_token) {
      setAccessToken(data.access_token);
    }
    if (data.user) {
      Cookies.set(CK_CLIENT_USER, JSON.stringify(sanitizeUserData(data.user)), COOKIE_CONFIG);
    }

    return data;
  },

  login: async (data) => {
    clearAuthData();

    const response = await fetch(`${BASE_URL}/api/client-auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: baseHeaders(),
      body: JSON.stringify({
        emailOrPhone: data.emailOrPhone,
        pass_word: data.pass_word
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const result = await response.json();

    if (result.access_token) {
      setAccessToken(result.access_token);
    }
    if (result.user) {
      Cookies.set(CK_CLIENT_USER, JSON.stringify(sanitizeUserData(result.user)), COOKIE_CONFIG);
    }

    return result;
  },

  refreshToken: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/client-auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: baseHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access_token) {
          setAccessToken(data.access_token);
        }
        return data;
      }

      return null;
    } catch (error) {
      console.error('Refresh token error:', error);
      return null;
    }
  },

  checkAuth: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/client-auth/check-auth`, {
        method: 'GET',
        credentials: 'include',
        headers: baseHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        if (data.authenticated) {
          if (data.access_token) {
            setAccessToken(data.access_token);
          }
          if (data.user) {
            Cookies.set(CK_CLIENT_USER, JSON.stringify(sanitizeUserData(data.user)), COOKIE_CONFIG);
          }
          return { isAuthenticated: true, user: data.user, access_token: data.access_token };
        }
      }

      clearAuthData();
      return { isAuthenticated: false };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Check auth error:', error);
      }
      clearAuthData();
      return { isAuthenticated: false };
    }
  },

  getCurrentToken: () => getAccessToken(),
  clearCurrentToken: () => clearAccessToken(),

  logout: async () => {
    try {
      const token = getAccessToken();
      const headers = baseHeaders();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      await fetch(`${BASE_URL}/api/client-auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
    }
  },

  logoutAllSessions: async () => {
    try {
      const token = getAccessToken();
      const headers = baseHeaders();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      await fetch(`${BASE_URL}/api/client-auth/logout-all`, {
        method: 'POST',
        credentials: 'include',
        headers
      });
    } catch (error) {
      console.error('Logout all sessions error:', error);
    } finally {
      clearAuthData();
    }
  },

  getCurrentUser: () => {
    const user = Cookies.get(CK_CLIENT_USER);
    return user ? JSON.parse(user) : null;
  },

  forgotPasswordRequest: async (email) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/forgot-password/request`, {
      method: 'POST',
      credentials: 'include',
      headers: baseHeaders(),
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send OTP');
    }

    return await response.json();
  },

  verifyForgotPasswordOtp: async (email, code) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/forgot-password/verify-otp`, {
      method: 'POST',
      credentials: 'include',
      headers: baseHeaders(),
      body: JSON.stringify({ email, code })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Verification failed');
    }

    return await response.json();
  },

  resetPassword: async (email, code, newPassword) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/forgot-password/reset`, {
      method: 'POST',
      credentials: 'include',
      headers: baseHeaders(),
      body: JSON.stringify({ email, code, new_password: newPassword })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Password reset failed');
    }

    clearAuthData();
    return await response.json();
  },

  completeOAuthRegistration: async (tempKey, phone) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/complete-oauth-registration`, {
      method: 'POST',
      credentials: 'include',
      headers: baseHeaders(),
      body: JSON.stringify({ tempKey, phone })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'OAuth registration failed');
    }

    const result = await response.json();

    if (result.access_token) {
      setAccessToken(result.access_token);
    }
    if (result.user) {
      Cookies.set(CK_CLIENT_USER, JSON.stringify(sanitizeUserData(result.user)), COOKIE_CONFIG);
    }

    return result;
  },

  clearAuthData
};

export { getAccessToken, setAccessToken };
