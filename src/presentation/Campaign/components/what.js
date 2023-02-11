import { DatePicker, Input, Select, TimePicker } from "antd";
import React from "react";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import dayjs from "dayjs";
import AdPlayList from "./adPlaylist";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
const Timeformat = "HH:mm";

const what = ({ editStatus }) => {
  return (
    <div>
      <span className="tabs_card">
        <Cards headless>
          <div>
            <h5>Playlist settings</h5>
            <span className="select-wrap-container">
              <span className="select-wrap">
                <p>Playlist Type</p>
                <Select
                  disabled={!editStatus}
                  defaultValue="lucy"
                  // onChange={handleChange}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </span>
              <span className="select-wrap" style={{ marginLeft: "24px" }}>
                <p>Playlist Duration(sec)</p>
                <Input disabled={!editStatus} defaultValue="7" />
              </span>
            </span>
          </div>
          <div>
            <h5 style={{ paddingTop: "34px" }}>Playlist Item Settings</h5>
            <span className="select-wrap-container">
              <span className="select-wrap">
                <p>Date Range</p>
                <RangePicker
                  disabled={!editStatus}
                  defaultValue={[
                    dayjs("2015/01/01", dateFormat),
                    dayjs("2015/01/01", dateFormat),
                  ]}
                  format={dateFormat}
                />
              </span>
              <span className="select-wrap" style={{ marginLeft: "24px" }}>
                <p>Day of the week</p>
                <Select
                  disabled={!editStatus}
                  defaultValue="lucy"
                  // onChange={handleChange}
                  options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                  ]}
                />
              </span>
            </span>
          </div>
          <div style={{ paddingTop: "32px" }}>
            <span className="select-wrap-container">
              <span className="select-wrap">
                <p>Time Range</p>
                <TimePicker.RangePicker
                  disabled={!editStatus}
                  format={Timeformat}
                />
              </span>
            </span>
          </div>
        </Cards>
      </span>
      <span className="tabs_card">
        <Cards headless className="tabs_card">
          <AdPlayList />
        </Cards>
      </span>
    </div>
  );
};

export default what;
