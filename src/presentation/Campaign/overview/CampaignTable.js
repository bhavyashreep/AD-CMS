import React from "react";
import { Button, Table } from "antd";
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../common/Style/styled";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import FeatherIcon from "feather-icons-react";

const CampaignTable = ({ usersTableData }) => {
  console.log("dataaaa", usersTableData);
  const usersTableColumns = [
    {
      title: "Campaigns",
      dataIndex: "campaign",
      key: "campaign",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
    <Cards headless>
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
