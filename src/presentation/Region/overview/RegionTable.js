import React from "react";
import { Table } from "antd";
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../common/Style/styled";
import { Cards } from "../../common/UI/cards/frame/cards-frame";

const RegionTable = ({usersTableData}) => {
  console.log("dataaaa",usersTableData)
  const usersTableColumns = [
    {
      title: "Region Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Region",
      dataIndex: "name",
      key: "name",
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

export default RegionTable;
