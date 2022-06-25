import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../common/Style/styled";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import ViewCards from "../../common/ViewCards";

const UserListTable = (profile) => {
  const [password, setpassword] = useState("");

  useEffect(() => {
    getPwdPattern("Bhavya");
  }, []);
console.log("dataaaa",profile)
  const getPwdPattern = (pass) => {
    console.log("pwsd1", pass);

    let pwd = "*";
    for (let i = 0; i < pass?.length; i++) {
      pwd = pwd + "*";
    }
    console.log("pwsd", pwd);
    setpassword(pwd);
  };

  return (
    <Cards headless>
      <ViewCards label="Name" value={profile?.profile?.user?.first_name+" "+profile?.profile?.user?.last_name} />
      <ViewCards label="Email" value={profile?.profile?.user?.email}/>
      <ViewCards label="Phone Number" value={profile?.profile?.phone_number} />
      <ViewCards label="Password" value={password} />
    </Cards>
  );
};

export default UserListTable;
