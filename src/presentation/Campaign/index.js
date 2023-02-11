import React, { useEffect } from "react";
import { Row, Col, Popconfirm, Switch } from "antd";
import FeatherIcon from "feather-icons-react";
import CampaignTable from "./overview/CampaignTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import { useUserStore } from "./store";
import Heading from "../common/UI/heading/heading";
import ViewCustomer from "./overview/ViewCustomer";
// import CreateUser from "./overview/CreateUser";
// import EditUser from "./overview/EditUser";
import { Link, useHistory } from "react-router-dom";

const CampaignList = () => {
  let history = useHistory();
  const [
    { customerList, searchData },
    {
      setVisible,
      getCustomer,
      setSearchData,
      onEdit,
      onDelete,
      setVisibleEdit,
      setVisibleCreate,
      switchChange,
    },
  ] = useUserStore();
  useEffect(() => {
    window.scroll(0, 0);
    console.log(localStorage.getItem("token"), "token rdgrfhfc");
    getCustomer();
  }, [getCustomer]);
  useEffect(() => {}, [customerList]);
  console.log(customerList, "cusss");
  const handleSearch = (searchText) => {
    console.log("value", searchText);
    const data = customerList?.filter((value) =>
      value.user?.first_name.toUpperCase().startsWith(searchText.toUpperCase())
    );
    setSearchData(data);
  };
  const customerDataVal = [
    {
      status: 1,
      campaign: "New compaign",
      startDate: "23-09-2022",
      endDate: "22-10-2023",
      id: "345345456",
    },
    {
      status: 1,
      campaign: "New compaign",
      startDate: "12-12-2023",
      endDate: "25-03-2024",
      id: "459684567",
    },
    {
      status: 1,
      campaign: "New compaign",
      startDate: "03-03-2022",
      endDate: "02-04-2023",
      id: "09873242",
    },
  ];
  const customerData = customerDataVal?.map((customer, index) => {
    console.log(customer);
    return {
      key: (
        <div>
          <input type="checkbox"></input>
        </div>
      ),
      id: customer?.id,
      campaign: (
        <Link to={`/campaignlist/${customer?.id}`}>{customer?.campaign}</Link>
      ),
      startDate: customer?.startDate,
      endDate: customer?.endDate,
      status:
        customer.status === 1 ? (
          <span className={`status-text active`}>{"active"}</span>
        ) : customer.status === 2 ? (
          <span className={`status-text blocked`}>{"blocked"}</span>
        ) : (
          <span className={`status-text deactivate`}>{"deactive"}</span>
        ),
      action: (
        <div className="table-actions">
          <>
            {/* <Switch
            defaultChecked={customer?.status === 1 ? true : false}
            style={{ height: "unset!important" }}
            onChange={(value)=>switchChange(value ===true?1:0,customer.id)}
          /> */}

            {/* <Button
              onClick={() =>
                console.log("visss") ||
                setVisible({ value: true, id: customer?.id, history })
              }
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="eye" size={16} />
            </Button> */}
            <Button
              onClick={() => setVisibleEdit({ value: true, data: customer })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="edit" size={16} />
            </Button>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                onDelete({ id: customer?._id });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button className="btn-icon" type="danger" to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </Popconfirm>
          </>
        </div>
      ),
    };
  });

  return (
    <>
      <Main>
        <CardToolbox>
          <PageHeader
            ghost
            title="Campaign List"
            subTitle={
              <>
                {/* <span className="title-counter">
                {customerList?.length} Campaigns{" "}
              </span> */}
                {/* <AutoComplete
                onSearch={handleSearch}
                placeholder="Search by Name"
                width="100%"
                patterns
              /> */}
              </>
            }
            buttons={[
              <div style={{ display: "flex" }}>
                <AutoComplete
                  onSearch={handleSearch}
                  placeholder="Input search text"
                  width="100%"
                  patterns
                />
                <Button
                  onClick={() => setVisibleCreate({ value: true })}
                  key="1"
                  type="primary"
                  size="default"
                >
                  <FeatherIcon icon="plus" size={16} /> New Campaign
                </Button>
              </div>,
            ]}
          />
        </CardToolbox>
        <Row gutter={15}>
          <Col md={24}>
            <CampaignTable usersTableData={customerData} />
          </Col>
        </Row>

        {/* <CreateUser /> */}
        {/* <EditUser /> */}
      </Main>
    </>
  );
};

export default CampaignList;
