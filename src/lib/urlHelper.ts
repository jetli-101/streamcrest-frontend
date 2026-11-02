const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const urlHelper = {
  // Auth
  auth: {
    register: `${BASE_URL}/auth/register`,
    login: `${BASE_URL}/auth/login`,
    logout: `${BASE_URL}/auth/logout`,
    user: `${BASE_URL}/auth/user`,
  },

  // Users
  users: {
    list: `${BASE_URL}/users`,
    show: (id: number | string) => `${BASE_URL}/users/${id}`,
    update: (id: number | string) => `${BASE_URL}/users/${id}`,
    delete: (id: number | string) => `${BASE_URL}/users/${id}`,
  },
} as const;

export default urlHelper;
