import React, { useEffect } from "react";
import { Row, Col, Popconfirm, Switch } from "antd";
import FeatherIcon from "feather-icons-react";
import CustomerTable from "./overview/CustomerTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import { usePaymentStore } from "./store";
import Heading from "../common/UI/heading/heading";
// import ViewCustomer from "./overview/ViewCustomer";
// import CreateUser from "./overview/CreateUser";
// import EditUser from "./overview/EditUser";
import { useHistory } from "react-router-dom";

const Profile= () => {
  let history = useHistory();
  const [
    { customerList, searchData },
    {
      setVisible,
      getPayments,
      setSearchData,
      onEdit,
      onDelete,
      setVisibleEdit,
      setVisibleCreate,
      switchChange,
    },
  ] = usePaymentStore();
  useEffect(() => {
    window.scroll(0, 0);
    getPayments();
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
          title="Payment Management"
          subTitle={
            <>
              <span className="title-counter">
                {customerList?.length} Transations{" "}
              </span>
              <AutoComplete
                onSearch={handleSearch}
                placeholder="Search by Name"
                width="100%"
                patterns
              />
            </>
          }
          // buttons={[
          //   <Button
          //     onClick={() => setVisibleCreate({ value: true })}
          //     key="1"
          //     type="primary"
          //     size="default"
          //   >
          //     <FeatherIcon icon="plus" size={16} /> Add New User
          //   </Button>,
          // ]}
        />
      </CardToolbox>

      <Main>
        <Row gutter={15}>
          <Col md={24}>
            <div>
              profile
              </div>
            {/* <CustomerTable usersTableData={customerData} /> */}
          </Col>
        </Row>

        {/* <CreateUser /> */}
        {/* <EditUser /> */}
      </Main>
    </>
  );
};

export default Profile;
