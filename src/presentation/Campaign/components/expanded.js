import React, { useState } from "react";
import { Input, Select, Tabs } from "antd";
import { CampaignSide, Main, SubMain } from "../../common/Style/styled";
import What from "./what";
import Dummy1 from "../../common/Assets/Images/dummy1.png";

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
    <span style={{ display: "flex" }}>
      <SubMain>
        <div>
          <span className="what-head-wrap">
            <h2 className="what-head">Campaign 1</h2>
            <button
              className="what-edit-btn"
              onClick={() => seteditStatus(true)}
            >
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
      <CampaignSide>
        <h2>Canvas settings</h2>
        <img src={Dummy1}></img>
        <span className="select-wrap">
          <p>Canvas Dimensions</p>
          <Input disabled={!editStatus} placeholder="height" />
          <Input
            disabled={!editStatus}
            placeholder="width"
            style={{ marginLeft: "14px" }}
          />
        </span>
        <span className="select-wrap" style={{ paddingTop: "40px" }}>
          <p>Selected Zones</p>
          <Select
            disabled={!editStatus}
            defaultValue="Zone2"
            // onChange={handleChange}
            options={[
              { value: "Zone1", label: "Zone1" },
              { value: "Zone2", label: "Zone2" },
              { value: "Zone3", label: "Zone3" },
            ]}
          />
        </span>
      </CampaignSide>
    </span>
  );
};

export default Expanded;
