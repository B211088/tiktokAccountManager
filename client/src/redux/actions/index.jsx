import { createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getAccounts = createActions({
  getAccountsRequest: undefined,
  getAccountsSuccess: (payload) => payload,
  getAccountsFailure: (error) => ({ error }),
});

export const createAccount = createActions({
  createAccountRequest: (payload) => payload,
  createAccountSuccess: (payload) => payload,
  createAccountFailure: (error) => ({ error }),
});

export const updateAccount = createActions({
  updateAccountRequest: (payload) => payload,
  updateAccountSuccess: (payload) => payload,
  updateAccountFailure: (errorMessage) => ({
    error: true,
    message: errorMessage,
  }),
});

export const deleteAccount = createActions({
  deleteAccountRequest: (payload) => payload,
  deleteAccountSuccess: (payload) => payload,
  deleteAccountFailure: (errorMessage) => ({
    error: true,
    message: errorMessage,
  }),
});
