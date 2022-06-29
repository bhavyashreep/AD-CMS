import React, { useEffect } from "react";
import { Row, Col, Popconfirm, Switch } from "antd";
import FeatherIcon from "feather-icons-react";
import ServiceTable from "./overview/ServiceTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import { useServiceReqStore } from "./store";
import Heading from "../common/UI/heading/heading";
import ViewService from "./overview/ViewService";
// import CreateUser from "./overview/CreateUser";
// import EditUser from "./overview/EditUser";
import { useHistory } from "react-router-dom";

const ServiceRequests = () => {
  let history = useHistory()
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
      switchChange
    },
  ] = useServiceReqStore();
  useEffect(() => {
    window.scroll(0, 0);
    getCustomer();
  }, []);
  console.log(customerList,"cusss")
  const handleSearch = (searchText) => {
    console.log("value",searchText)
    const data = customerList?.filter((value) =>
      value.user?.first_name.toUpperCase().startsWith(searchText.toUpperCase())
    );
    setSearchData(data);
  };
  const customerData = searchData?.map((serviceReq, index) => {
    console.log(serviceReq);
    return {
      key: index,
      id:serviceReq?.serviceReq_id,
      service_name:serviceReq?.user?.first_name,
      cutomer_name:serviceReq?.user?.first_name,
      email:serviceReq?.user?.email,
      user: (
        <div className="user-info">
          {/* <figure>
            <img
              style={{ width: "50px", height: "50px", "border-radius": "50%" }}
              src="https://picsum.photos/id/237/200/300"
              alt="Faculty"
            />
          </figure> */}
          <figcaption>
            <Heading className="user-name" as="h6">
              {serviceReq.name}
            </Heading>
            <span className="user-designation">{serviceReq.email}</span>
          </figcaption>
        </div>
      ),
      phone: serviceReq.phone,
      type: serviceReq.type,
      status:
        serviceReq.status === 1 ? (
          <span className={`status-text active`}>{"active"}</span>
        ) : serviceReq.status === 2 ? (
          <span className={`status-text blocked`}>{"blocked"}</span>
        ) : (
          <span className={`status-text deactivate`}>{"deactive"}</span>
        ),
      action: (
        <div className="table-actions">
          <>
          {/* <Switch
            defaultChecked={serviceReq?.status === 1 ? true : false}
            style={{ height: "unset!important" }}
            onChange={(value)=>switchChange(value ===true?1:0,serviceReq.id)}
          /> */}

            <Button
              onClick={() => console.log("visss")||setVisible({ value: true ,id:serviceReq?.id,history})}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="eye" size={16} />
            </Button>
            {/* <Button
              onClick={() => setVisibleEdit({ value: true, data: serviceReq })}
              className="btn-icon"
              type="info"
              to="#"
              shape="circle"
            >
              <FeatherIcon icon="edit" size={16} />
            </Button> */}
            {/* <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                onDelete({ id: serviceReq?._id });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button className="btn-icon" type="danger" to="#" shape="circle">
                <FeatherIcon icon="trash-2" size={16} />
              </Button>
            </Popconfirm> */}
          </>
        </div>
      ),
    };
  });

  return (
    <>
      <CardToolbox>
        <PageHeader
          ghost
          title="Service Request Management"
          subTitle={
            <>
              <span className="title-counter">
                {customerList?.length} Customers{" "}
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
            <ServiceTable usersTableData={customerData} />
          </Col>
        </Row>
     
        {/* <CreateUser /> */}
        {/* <EditUser /> */}
      </Main>
    </>
  );
};

export default ServiceRequests;
