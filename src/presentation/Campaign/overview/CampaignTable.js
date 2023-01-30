import React from "react";
import { Button, Table } from "antd";
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../common/Style/styled";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import FeatherIcon from "feather-icons-react";


const CampaignTable = ({usersTableData}) => {
  console.log("dataaaa",usersTableData)
  const usersTableColumns = [
    {
      title: "Campaigns",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Start Date",
      dataIndex: "name",
      key: "name",
    },{
      title: "End Date",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: "90px",
    },
  ];

  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <Cards  >
     
      {/* <Button
        // onClick={() => setVisibleCreate({ value: true })}
        key="1"
        type="primary"
        size="default"
      >
        <FeatherIcon icon="plus" size={16} />  New Campaign
      </Button>, */}
    
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            className="span-flex"
            // rowSelection={rowSelection}
            dataSource={usersTableData}
            columns={usersTableColumns}
            pagination={{
              defaultPageSize: 10,
              total: usersTableData?.length,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
      <p></p>
    </Cards>
  );
};

export default CampaignTable;
