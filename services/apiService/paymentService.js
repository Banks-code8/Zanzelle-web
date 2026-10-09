// services/paymentService.js

import { postData, getData } from '../hooks/apiHelper';

export const initializePayment = (orderId) =>
  postData('/payments/initialize', { orderId });

export const verifyPayment = (reference) =>
  getData(`/payments/verify/${reference}`);
