import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchAccountsSaga() {
  try {
    const accounts = yield call(api.fetchAccounts);
    yield put(actions.getAccounts.getAccountsSuccess(accounts.data));
  } catch (error) {
    yield put(
      actions.getAccounts.getAccountsFailure(error.message || "Có lỗi xảy ra")
    );
  }
}

function* createAccountSaga(action) {
  try {
    const account = yield call(api.createAccount, action.payload);
    yield put(actions.createAccount.createAccountSuccess(account.data));
  } catch (error) {
    yield put(
      actions.createAccount.createAccountFailure(
        error.message || "Có lỗi xảy ra"
      )
    );
  }
}

function* updateAccountSaga(action) {
  try {
    const updatedAccount = yield call(api.updateAccount, action.payload);
    yield put(actions.updateAccount.updateAccountSuccess(updatedAccount.data));
  } catch (error) {
    yield put(
      actions.updateAccount.updateAccountFailure(
        error.message || "Có lỗi xảy ra"
      )
    );
  }
}

function* deleteAccountSaga(action) {
  try {
    const deletedAccount = yield call(api.deleteAccount, action.payload); // Gọi API xóa tài khoản
    yield put(actions.deleteAccount.deleteAccountSuccess(deletedAccount.data));
  } catch (error) {
    yield put(
      actions.deleteAccount.deleteAccountFailure(
        error.message || "Có lỗi xảy ra"
      )
    );
  }
}

function* mySaga() {
  yield takeLatest(actions.getAccounts.getAccountsRequest, fetchAccountsSaga);
  yield takeLatest(
    actions.createAccount.createAccountRequest,
    createAccountSaga
  );
  yield takeLatest(
    actions.updateAccount.updateAccountRequest,
    updateAccountSaga
  );
  yield takeLatest(
    actions.deleteAccount.deleteAccountRequest,
    deleteAccountSaga
  ); // Sửa tên action
}

export default mySaga;
