import React from "react";
import { Button, Table } from "antd";
import { UserTableStyleWrapper } from "../style";
import { TableWrapper } from "../../common/Style/styled";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import FeatherIcon from "feather-icons-react";

const TableDevices = ({ usersTableData }) => {
  const usersTableColumns = [
    // {
    //   title: <input type="checkbox"></input>,
    //   dataIndex: "key",
    //   key: "key",
    //   width: "19px",
    // },
    {
      title: "Device Name",
      dataIndex: "device",
      key: "device",
    },
    {
      title: "Last Activity",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const rowSelection = {
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
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
  );
};

export default TableDevices;
