// import { postData, getData, patchData } from "./apiHelper.js";

// export const registerUser = (data) => postData("/auth/register", data);

// export const verifyUser = (data) => postData("/auth/verification", data);

// export const loginUser = (data) => postData("/auth/login", data);

// export const forgetPasssword = (data) =>
//   patchData("/auth/forgetPassword", data);

// export const getMe = () => getData("/auth/getMe");

// export const logoutUser = () => postData("/auth/logout");

import { postData, getData } from "./apiHelper.js";

// ======================
// REGISTER
// ======================
export const registerUser = (data) => postData("/auth/register", data);

// ======================
// EMAIL VERIFICATION
// ======================
export const verifyUser = (data) => postData("/auth/verification", data);

export const resendVerification = (data) =>
  postData("/auth/resend-verification", data);

// ======================
// LOGIN
// ======================
export const loginUser = (data) => postData("/auth/login", data);

// ======================
// FORGOT PASSWORD
// ======================
export const forgetPassword = (data) => postData("/auth/forgetPassword", data);

// ======================
// RESET PASSWORD
// ======================
export const resetPassword = (data) => postData("/auth/resetPassword", data);

// ======================
// CURRENT USER
// ======================
export const getMe = () => getData("/auth/getMe");

// ======================
// LOGOUT
// ======================
export const logoutUser = () => postData("/auth/logout");
