import React, { useEffect } from "react";
import { Row, Col, Popconfirm, Switch } from "antd";
import FeatherIcon from "feather-icons-react";
import CustomerTable from "./overview/CustomerTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import { useProfileStore } from "./store";
import Heading from "../common/UI/heading/heading";
// import ViewCustomer from "./overview/ViewCustomer";
// import CreateUser from "./overview/CreateUser";
// import EditUser from "./overview/EditUser";
import { useHistory } from "react-router-dom";

const Profile= () => {
  let history = useHistory();
  const [
    { customerList, profile },
    {
      setVisible,
      getPayments,
      setSearchData,
      onEdit,
      onDelete,
      setVisibleEdit,
      setVisibleCreate,
      profileDetails,
    },
  ] = useProfileStore();
  useEffect(() => {
    window.scroll(0, 0);
    profileDetails();
  }, []);
  console.log(customerList, "cusss");
  const handleSearch = (searchText) => {
    console.log("value", searchText);
    const data = customerList?.filter((value) =>
      value.user?.first_name.toUpperCase().startsWith(searchText.toUpperCase())
    );
    setSearchData(data);
  };
 

  return (
    <>
      <CardToolbox>
        <PageHeader
          ghost
          title="Profile Management"
          subTitle={
            <>
          
            </>
          }
        
        />
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col md={24}>
           
            <CustomerTable profile={profile} />
          </Col>
        </Row>

        {/* <CreateUser /> */}
        {/* <EditUser /> */}
      </Main>
    </>
  );
};

export default Profile;
