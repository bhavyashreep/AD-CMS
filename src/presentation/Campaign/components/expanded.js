import React, { useState } from "react";
import { Tabs } from "antd";
import { Main, SubMain } from "../../common/Style/styled";
import What from "./what";

const { TabPane } = Tabs;

const Expanded = () => {
  const [editStatus, seteditStatus] = useState(false);
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
    <SubMain>
      <div>
        <span className="what-head-wrap">
          <h2 className="what-head">Campaign 1</h2>
          <button className="what-edit-btn" onClick={() => seteditStatus(true)}>
            Edit
          </button>
        </span>
        <Tabs defaultActiveKey="1">
          <TabPane tab="What" key="1">
            <What editStatus={editStatus} />
          </TabPane>
          <TabPane tab="When" key="2">
            When
          </TabPane>
          <TabPane tab="Where" key="3">
            Where
          </TabPane>
          <TabPane tab="Settings" key="4">
            Settings
          </TabPane>

          {/* <TabPane tab="MCQ" key="4">
            <MCQ />
          </TabPane> */}
        </Tabs>
      </div>
    </SubMain>
  );
};

export default Expanded;
