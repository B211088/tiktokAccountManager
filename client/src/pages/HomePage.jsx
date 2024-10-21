import AddAcount from "../components/AddAccount/AddAcount";
import Header from "../components/header/Header";
import ListAcount from "../components/ListAccount/ListAcount";
import Tools from "../components/Tools/Tools";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [statusAddAccount, setStatusAddAccount] = useState(false);
  const [refreshList, setRefreshList] = useState(false); // State to control refresh

  const changeStatusAddAccount = () => {
    setStatusAddAccount(!statusAddAccount);
  };

  const refreshComponent = () => {
    setRefreshList((prev) => !prev);
  };

  useEffect(() => {}, [refreshList]);

  return (
    <div className="w-full flex flex-col justify-center items-center relative ">
      <Header />
      <Tools onClick={changeStatusAddAccount} />
      {statusAddAccount && (
        <AddAcount
          onClose={changeStatusAddAccount}
          onSuccess={refreshComponent}
        />
      )}
      <ListAcount key={refreshList} refreshList={refreshComponent} />
    </div>
  );
};

export default HomePage;
