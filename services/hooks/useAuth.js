import { create } from "zustand";

import {
  loginUser,
  registerUser,
  getMe,
  logoutUser,
} from "@/services/apiService/authService";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  initialized: false,

  // =====================
  // GET CURRENT USER
  // =====================
  getUserData: async () => {
    try {
      const res = await getMe();

      if (!res.success) {
        set({
          user: null,
          isAuthenticated: false,
          initialized: true,
        });

        return;
      }

      const user = res.data?.data;

      set({
        user,
        isAuthenticated: true,
        initialized: true,
      });
    } catch (error) {
      console.error("Get user failed:", error);

      set({
        user: null,
        isAuthenticated: false,
        initialized: true,
      });
    }
  },

  // =====================
  // LOGIN
  // =====================
  login: async (credentials) => {
    const res = await loginUser(credentials);

    if (!res.success) {
      return res;
    }

    // cookie already stored by browser
    // fetch the real user
    const me = await getMe();

    if (me.success) {
      const user = me.data?.data;

      set({
        user,
        isAuthenticated: true,
        initialized: true,
      });

      return {
        ...res,
        user,
      };
    }

    return res;
  },

  // =====================
  // REGISTER
  // =====================
  register: async (data) => {
    return registerUser(data);
  },

  // =====================
  // LOGOUT
  // =====================
  logout: async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        initialized: true,
      });

      window.location.href = "/";
    }
  },
}));
