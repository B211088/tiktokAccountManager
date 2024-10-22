import axios from "axios";

const URL = "https://tiktokaccountmanager.onrender.com";

export const fetchAccounts = () => axios.get(`${URL}/accounts`);
export const createAccount = (payload) =>
  axios.post(`${URL}/accounts`, payload);
export const updateAccount = (payload) =>
  axios.put(`${URL}/accounts/${payload._id}`, payload);

export const deleteAccount = (payload) =>
  axios.delete(`${URL}/accounts/${payload._id}`, payload);
