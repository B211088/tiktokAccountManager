import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../../redux/actions";
import { accountsState$ } from "../../redux/selector";

const ListAccount = ({ refreshList }) => {
  const dispatch = useDispatch();
  const accounts = useSelector(accountsState$);
  const [accountList, setAccountList] = useState([]);
  const [sortOption, setSortOption] = useState(""); // Trạng thái để theo dõi lựa chọn sắp xếp
  const [searchTerm, setSearchTerm] = useState(""); // Trạng thái để theo dõi từ khóa tìm kiếm

  useEffect(() => {
    dispatch(actions.getAccounts.getAccountsRequest());
  }, [dispatch]);

  const handleRefresList = () => {
    refreshList();
    dispatch(actions.getAccounts.getAccountsRequest());
  };

  useEffect(() => {
    if (Array.isArray(accounts)) {
      setAccountList(accounts);
    }
  }, [accounts]);

  // Hàm để sắp xếp danh sách tài khoản
  const sortAccounts = (option) => {
    const sortedAccounts = [...accountList].sort((a, b) => {
      if (option === "dateAsc") {
        const daysA = Math.floor((Date.now() - a.date) / (1000 * 60 * 60 * 24));
        const daysB = Math.floor((Date.now() - b.date) / (1000 * 60 * 60 * 24));
        return daysA - daysB; // Sắp xếp theo số ngày từ thấp đến cao
      } else if (option === "dateDesc") {
        const daysA = Math.floor((Date.now() - a.date) / (1000 * 60 * 60 * 24));
        const daysB = Math.floor((Date.now() - b.date) / (1000 * 60 * 60 * 24));
        return daysB - daysA; // Sắp xếp theo số ngày từ cao đến thấp
      } else if (option === "pertainAsc") {
        return a.pertain - b.pertain; // Sắp xếp theo máy từ thấp đến cao
      } else if (option === "pertainDesc") {
        return b.pertain - a.pertain; // Sắp xếp theo máy từ cao đến thấp
      }
      return 0; // Không sắp xếp nếu không có lựa chọn
    });
    setAccountList(sortedAccounts);
  };

  const handleSortChange = (e) => {
    const newOption = e.target.value;
    setSortOption(newOption);
    sortAccounts(newOption);
  };

  // Hàm tìm kiếm tài khoản
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
  };

  // Lọc danh sách tài khoản dựa trên từ khóa tìm kiếm
  const filteredAccounts = accountList.filter((account) => {
    return (
      (account.idTiktok &&
        account.idTiktok.toLowerCase().includes(searchTerm)) ||
      (account.accountGoogle &&
        account.accountGoogle.toLowerCase().includes(searchTerm))
    );
  });

  return (
    <div className="w-full sm:w-[90%] min-w-[370px] flex flex-col items-center relative z-[1] px-[10px]">
      <div className=" w-full flex items-center justify-between flex-wrap  mt-[30px] py-[10px] px-[10px] bg-bg-light border-[1px] rounded-[5px] border-cl-border">
        <div className=" sm:w-[200px] w-full h-[50px] leading-[50px]">
          Số lượng acc: {filteredAccounts.length}
        </div>
        <div className="sm:w-[70%] w-full flex items-center sm:justify-end h-[50px] justify-between">
          <label
            htmlFor="search"
            className="mr-[5px]  min-w-[80px] leading-[50px] hidden sm:block"
          >
            Tìm kiếm:
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Nhập ID TikTok hoặc Email"
            className="border w-[60%] max-w-[360px]  rounded-[2px]h-[30px] text-[0.9rem] px-[5px] h-[34px] rounded-[2px]"
          />
          <label htmlFor="sortOption" className="ml-4 mr-[5px] hidden sm:block">
            Sắp xếp:
          </label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={handleSortChange}
            className="border rounded-[2px] w-[38%] max-w-[200px] text-[0.9rem] px-[5px] h-[34px]"
          >
            <option value="">Chọn sắp xếp</option>
            <option value="dateAsc">Ngày Tăng dần</option>
            <option value="dateDesc">Ngày Giảm dần</option>
            <option value="pertainAsc">Máy Tăng dần</option>
            <option value="pertainDesc">Máy Giảm dần</option>
          </select>
        </div>
      </div>

      <div
        className="w-full mt-[30px] flex flex-col gap-[10px] overflow-auto scrollbar-hide mb-[30px] py-[10px] z-[2]"
        style={{ height: "calc(100vh - 224px)" }}
      >
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((account, index) => (
            <Account
              key={account._id || index}
              account={account}
              index={index}
              onEdit={handleRefresList}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">
            Không thể tìm thấy tài khoản nào {":(("}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListAccount;
