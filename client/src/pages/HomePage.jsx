import AddAcount from "../components/AddAccount/AddAcount";
import Header from "../components/header/Header";
import ListAcount from "../components/ListAccount/ListAcount";
import Tools from "../components/Tools/Tools";
import { useState } from "react";

const HomePage = () => {
  const [statusAddAccount, setStatusAddAccount] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const changeStatusAddAccount = () => {
    setStatusAddAccount(!statusAddAccount);
  };

  const handleAddAccountSubmit = () => {
    setStatusAddAccount(false);
    handleRefreshList();
  };

  const handleRefreshList = () => {
    setRefreshList((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center relative">
      <Header />
      <Tools onClick={changeStatusAddAccount} />
      {statusAddAccount && (
        <AddAcount
          onClose={handleAddAccountSubmit}
          submitSucces={handleRefreshList}
        />
      )}
      <ListAcount refreshList={refreshList} onEdit={handleRefreshList} />
    </div>
  );
};

export default HomePage;
