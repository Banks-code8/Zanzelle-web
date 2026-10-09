import { postData, getData } from "../hooks/apiHelper.js";

export const registerUser = (data) => postData("/auth/register", data);

export const loginUser = (data) => postData("/auth/login", data);

export const getMe = () => getData("/auth/getMe");

export const logoutUser = () => postData("/auth/logout");
