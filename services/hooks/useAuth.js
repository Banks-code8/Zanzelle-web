// import { create } from "zustand";

// import {
//   loginUser,
//   registerUser,
//   getMe,
//   logoutUser,
//   verifyUser,
//   forgetPasssword,
// } from "@/services/apiService/authService";

// export const useAuthStore = create((set) => ({
//   user: null,
//   isAuthenticated: false,
//   initialized: false,

//   // =====================
//   // GET CURRENT USER
//   // =====================
//   getUserData: async () => {
//     try {
//       const res = await getMe();

//       if (!res.success) {
//         set({
//           user: null,
//           isAuthenticated: false,
//           initialized: true,
//         });

//         return;
//       }

//       const user = res.data?.data;

//       set({
//         user,
//         isAuthenticated: true,
//         initialized: true,
//       });
//     } catch (error) {
//       console.error("Get user failed:", error);

//       set({
//         user: null,
//         isAuthenticated: false,
//         initialized: true,
//       });
//     }
//   },

//   // =====================
//   // LOGIN
//   // =====================
//   login: async (credentials) => {
//     const res = await loginUser(credentials);

//     if (!res.success) {
//       return res;
//     }

//     // cookie already stored by browser
//     // fetch the real user
//     const me = await getMe();

//     if (me.success) {
//       const user = me.data?.data;

//       set({
//         user,
//         isAuthenticated: true,
//         initialized: true,
//       });

//       return {
//         ...res,
//         user,
//       };
//     }

//     return res;
//   },
//   // =============FORGET-PASSWORD==========//
//   forgetPasssword: async (credentials) => {
//     const res = await forgetPasssword(credentials);

//     if (!res.success) {
//       set({
//         user,
//         isAuthenticated: true,
//         initialized: true,
//       });
//       return;
//     }

//     return res;
//   },
//   // =====================
//   // REGISTER
//   // =====================
//   register: async (data) => {
//     return registerUser(data);
//   },

//   verification: async (data) => {
//     return verifyUser(data);
//   },
//   // =====================
//   // LOGOUT
//   // =====================
//   logout: async () => {
//     try {
//       await logoutUser();
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       set({
//         user: null,
//         isAuthenticated: false,
//         initialized: true,
//       });

//       window.location.href = "/";
//     }
//   },
// }));

import { create } from "zustand";

import {
  loginUser,
  registerUser,
  getMe,
  logoutUser,
  verifyUser,
  resendVerification,
  forgetPassword,
  resetPassword,
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

        return res;
      }

      // Controller returns { success, data: user }
      const user = res.data;

      set({
        user,
        isAuthenticated: true,
        initialized: true,
      });

      return res;
    } catch (error) {
      console.error("Get user failed:", error);

      set({
        user: null,
        isAuthenticated: false,
        initialized: true,
      });

      return {
        success: false,
        message: error.response?.data?.message || "Failed to get current user",
      };
    }
  },

  // =====================
  // LOGIN
  // =====================
  login: async (credentials) => {
    try {
      const res = await loginUser(credentials);

      if (!res.success) {
        return res;
      }

      // The controller sets the HTTP-only cookie.
      // The login response already contains the user.
      const user = res.data;

      set({
        user,
        isAuthenticated: true,
        initialized: true,
      });

      return {
        ...res,
        user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  // =====================
  // REGISTER
  // =====================
  register: async (data) => {
    try {
      return await registerUser(data);
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  },

  // =====================
  // VERIFY EMAIL
  // =====================
  verification: async (data) => {
    try {
      return await verifyUser(data);
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Email verification failed",
      };
    }
  },

  // =====================
  // RESEND VERIFICATION
  // =====================
  resendVerification: async (data) => {
    try {
      return await resendVerification(data);
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Could not resend verification code",
      };
    }
  },

  // =====================
  // FORGOT PASSWORD
  // =====================
  forgetPassword: async (data) => {
    try {
      return await forgetPassword(data);
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Could not request password reset",
      };
    }
  },

  // =====================
  // RESET PASSWORD
  // =====================
  resetPassword: async (data) => {
    try {
      return await resetPassword(data);
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Password reset failed",
      };
    }
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

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  },
}));
