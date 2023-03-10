import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { SessionChartWrapper, SessionState } from "../style";
import { Cards } from "../../common/UI/cards/frame/cards-frame";
import { ChartjsDonutChart } from "../../common/UI/charts/chartjs";

import {
  deviceFilterData,
  deviceGetData,
} from "../../../redux/chartContent/actionCreator";

const SessionsByDevice = () => {
  const dispatch = useDispatch();
  const { deviceState, dvIsLoading } = useSelector((state) => {
    return {
      deviceState: state.chartContent.deviceData,
      dvIsLoading: state.chartContent.dvLoading,
    };
  });

  const [state, setState] = useState({
    device: "year",
  });

  useEffect(() => {
    if (deviceGetData) {
      dispatch(deviceGetData());
    }
  }, [dispatch]);

  const handleActiveChangeDevice = (value) => {
    setState({
      ...state,
      device: value,
    });
    dispatch(deviceFilterData(value));
  };

  return (
    <SessionChartWrapper>
      {deviceState !== null && (
        <Cards
          size="small"
          style={{
            width: 300,
          }}
          title="Online"
          // size="large"
        >
          {dvIsLoading ? (
            <div className="sd-spin">
              <Spin />
            </div>
          ) : (
            <div className="session-chart-inner">
              <ChartjsDonutChart
                labels={["No Data", "Online"]}
                datasets={[
                  {
                    data: deviceState,
                    backgroundColor: ["rgba(0, 0, 0, 0.08)", "#0062FF"],
                    total: "983",
                  },
                ]}
                options={{
                  cutoutPercentage: 80,
                }}
              />

              {/* <SessionState className="session-wrap d-flex justify-content-center">
                <div className="session-single">
                  <div className="chart-label">
                    <span className="label-dot dot-success" />
                    Subscribed
                  </div>
                  <span>
                    <span>{deviceState[0]}</span>
                    <sub>45%</sub>
                  </span>
                </div>
                <div className="session-single">
                  <div className="chart-label">
                    <span className="label-dot dot-info" />
                    Tablets
                  </div>
                  <span>{deviceState[1]}</span>
                  <sub>30%</sub>
                </div>
              </SessionState> */}
            </div>
          )}
        </Cards>
      )}
    </SessionChartWrapper>
  );
};

export default SessionsByDevice;
