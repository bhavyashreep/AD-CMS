import React from "react";
import { Tabs } from "antd";

const expanded = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `Tab 1`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: "2",
      label: `Tab 2`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: `Tab 3`,
      children: `Content of Tab Pane 3`,
    },
  ];
  return (
    <div style={{ minHeight: "100vh" }}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: "1",
            label: `Tab 1`,
            children: `Content of Tab Pane 1`,
          },
          {
            key: "2",
            label: `Tab 2`,
            children: `Content of Tab Pane 2`,
          },
          {
            key: "3",
            label: `Tab 3`,
            children: `Content of Tab Pane 3`,
          },
        ]}
        onChange={onChange}
      />
    </div>
  );
};

export default expanded;
