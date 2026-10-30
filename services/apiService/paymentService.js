import { postData, getData } from "./apiHelper.js";

// Internal transfer: send money to another Zanzelle user.
export const interTransfer = (data) =>
  postData("/payment/transfers/internal", data);

// External transfer: send money to a bank account.
export const outerTransfer = (data) =>
  postData("/payment/transfers/external", data);

// Purchase airtime, data, electricity, cable TV, recharge cards, etc.
export const purchasePayment = (data) => postData("/payment/purchase", data);

// Get a receipt for a specific transaction.
export const reciept = (reference) =>
  getData(`/payment/receipt/${encodeURIComponent(reference)}`);

// Retrieve the authenticated user's transaction history.
export const transactionHistory = (params = {}) =>
  getData("/payment/transactions", params);

// Initialize wallet funding.
export const wallet = (data) => postData("/payment/wallet", data);

// Request a withdrawal.
export const withdrawal = (data) => postData("/payment/withdrawals", data);

// Verify a Paystack transaction after checkout.
export const verifyPayment = (reference) =>
  getData(`/payment/verify/${encodeURIComponent(reference)}`);
