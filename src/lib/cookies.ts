import { parseCookies, setCookie, destroyCookie } from "nookies";

/**
 * Set in cookies.
 * Works in both CSR and SSR contexts.
 *
 * @param key - The key to be stored.
 * @param value - The value to be stored.
 * @param ctx - Optional Next.js context for SSR. Leave undefined for CSR.
 * @param options - Optional cookie options (e.g., maxAge, path, secure).
 */
export const setAppCookie = (
  key: string,
  value: string,
  ctx?: any,
  options?: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
  }
): void => {
  setCookie(ctx, key, value, {
    maxAge: options?.maxAge || 30 * 24 * 60 * 60,
    path: options?.path || "/",
    secure: options?.secure || process.env.NODE_ENV === "production",
    ...options,
  });
};

/**
 * Get from cookies.
 * Works in both CSR and SSR contexts.
 *
 * @param key - The key to get.
 * @param ctx - Optional Next.js context for SSR. Leave undefined for CSR.
 * @returns The auth token string, or null if not found.
 */
export const getAppCookie = (key: string, ctx?: any): string | null => {
  const cookies = parseCookies(ctx);
  return cookies[key] || null;
};

/**
 * Delete from cookies.
 * Works in both CSR and SSR contexts.
 *
 * @param key - The key to be deleted.
 * @param ctx - Optional Next.js context for SSR. Leave undefined for CSR.
 * @param options - Optional cookie options (e.g., path).
 */
export const deleteAppCookie = (
  key: string,
  ctx?: any,
  options?: {
    path?: string;
  }
): void => {
  destroyCookie(ctx, key, {
    path: options?.path || "/",
  });
};
