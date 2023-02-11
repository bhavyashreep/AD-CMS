import React from "react";
import { Button, Table } from "antd";
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../common/Style/styled";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import FeatherIcon from "feather-icons-react";

const CampaignTable = ({ usersTableData, setdeleteStatus, deleteStatus }) => {
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
  ];

  const rowSelection = {
    getCheckboxProps: (record) => ({
      // disabled: record.campaign === "Disabled User",
      id: record.id,
    }),
    onChange: (selectedRowKeys, selectedRows) => {
      setdeleteStatus(!deleteStatus);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
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
            rowSelection={rowSelection}
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
