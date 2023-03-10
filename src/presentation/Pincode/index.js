import React, { useEffect } from "react";
import { Row, Col, Popconfirm, Switch } from "antd";
import FeatherIcon from "feather-icons-react";
import RegionTable from "./overview/PincodeTable";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { AutoComplete } from "../common/UI/autoComplete/autoComplete";
import { Main, CardToolbox } from "../common/Style/styled";
import { Button } from "../common/UI/buttons/buttons";
import { usePincodeStore } from "./store";
import Heading from "../common/UI/heading/heading";
import ViewCustomer from "./overview/ViewPincode";
import { useRegionStore } from "../Region/store";
// import CreateUser from "./overview/CreateUser";
import EditPincode from "./overview/EditPincode";

const PincodeList = (props) => {
  const [
    { pincodeList, searchData },
    {
      setVisible,
      getPincodeData,
      setSearchData,
      onEdit,
      onDelete,
      setVisibleEdit,
      setVisibleCreate,
      switchChange
    },
  ] = usePincodeStore();
  

  useEffect(() => {
    window.scroll(0, 0);
    getPincodeData(props.match.params.id);
  }, []);
  console.log(props.match.params.id,"cusss")
  const handleSearch = (searchText) => {
    console.log("value",searchText)
    const data = pincodeList?.filter((value) =>
      value.user?.first_name.toUpperCase().startsWith(searchText.toUpperCase())
    );
    setSearchData(data);
  };
  const customerData = searchData?.map((customer, index) => {
    console.log(customer);
    return {
      key: index,
      id:customer?.id,
      pincode:customer?.pincode,
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
              {customer.name}
            </Heading>
            <span className="user-designation">{customer.email}</span>
          </figcaption>
        </div>
      ),
      phone: customer.phone,
      type: customer.type,
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
              onClick={() => console.log("visss")||setVisible({ value: true ,id:customer?.id})}
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
                onDelete({ id: customer?.id,region:props.match.params.id });
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
      <CardToolbox>
        <PageHeader
          ghost
          title="Pincode Management"
          subTitle={
            <>
              <span className="title-counter">
                {pincodeList?.length} Pincodes{" "}
              </span>
              <AutoComplete
                onSearch={handleSearch}
                placeholder="Search by Pincode"
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
            <RegionTable usersTableData={customerData} />
          </Col>
        </Row>
        <ViewCustomer />
        {/* <CreateUser /> */}
        <EditPincode />
      </Main>
    </>
  );
};

export default PincodeList;
