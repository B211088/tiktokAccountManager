import { INIT_STATE } from "../../constant";
import {
  getAccounts,
  createAccount,
  getType,
  updateAccount,
  deleteAccount,
} from "../actions";

export default function accountsReducers(state = INIT_STATE, action) {
  switch (action.type) {
    case getType(getAccounts.getAccountsRequest):
      return {
        ...state,
        isLoading: true,
        error: null, // Đặt lại lỗi khi bắt đầu yêu cầu
      };
    case getType(getAccounts.getAccountsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getAccounts.getAccountsFailure):
      return {
        ...state,
        isLoading: false,
        error: action.error, // Lưu trữ lỗi từ action
      };
    case getType(createAccount.createAccountSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
        isLoading: false, // Đặt thành false khi thành công
      };
    case getType(updateAccount.updateAccountSuccess):
      return {
        ...state,
        data: state.data.map((account) =>
          account._id === action.payload._id ? action.payload : account
        ),
      };
    case getType(updateAccount.updateAccountFailure):
      return {
        ...state,
        isLoading: false,
        error: action.message, // Lưu trữ thông điệp lỗi
      };
    case getType(deleteAccount.deleteAccountSuccess): // Thêm case cho thành công xóa tài khoản
      return {
        ...state,
        data: state.data.filter(
          (account) => account._id !== action.payload._id
        ), // Xóa tài khoản khỏi danh sách
        isLoading: false,
      };
    case getType(deleteAccount.deleteAccountFailure): // Thêm case cho thất bại xóa tài khoản
      return {
        ...state,
        isLoading: false,
        error: action.message, // Lưu trữ thông điệp lỗi
      };
    default:
      return state;
  }
}
