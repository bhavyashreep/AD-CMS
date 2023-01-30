import React, { lazy, Suspense, useEffect } from "react";
import { Row, Col, Skeleton } from "antd";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { Cards } from "../common/UI/cards/frame/cards-frame";
import { Main } from "../styled";
// import { useDashboardStore } from "./store";
import { Column } from "@ant-design/plots";
import Dummy1 from "../common/Assets/Images/dummy1.png";

const CardGroup = lazy(() => import("./overview/CardGroup"));
const AccountGroup = lazy(() => import("./overview/AccountGroup"));
const Subscription = lazy(() => import("./overview/SessionsByDevice"));

const Dashboard = () => {
  const data = [
    {
      type: "1",
      sales: 200,
    },
    {
      type: "2",
      sales: 1400,
    },
    {
      type: "3",
      sales: 600,
    },
    {
      type: "4",
      sales: 100,
    },
    {
      type: "5",
      sales: 1000,
    },
    {
      type: "6",
      sales: 1200,
    },
    {
      type: "7",
      sales: 300,
    },
    {
      type: "8",
      sales: 800,
    },
    {
      type: "9",
      sales: 1400,
    },
    {
      type: "10",
      sales: 600,
    },
    {
      type: "11",
      sales: 100,
    },
    {
      type: "12",
      sales: 1000,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    columnWidthRatio: 0.5,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    yAxis: {
      steps: 12,
    },
    meta: {
      type: {
        alias: "values",
      },
      sales: {
        alias: "Amount",
      },
    },
  };
  // const [
  //   { totalExperts},
  //   {
  //     getTotalExperts,
  //     getTotalUsers,
  //     getTotalRevenue
  //   },
  // ] = useDashboardStore();
  // useEffect(() => {
  //   getTotalExperts();
  //   getTotalUsers();
  //   getTotalRevenue();
  // }, [])
  return (
    <>
      <PageHeader />
      <Main>
        <Row gutter={10}>
          <Col md={7}>
            <Subscription />
          </Col>
          <Col md={17}>
            <Cards headless>
              <span className="title">Most Active Playlist</span>
              <div className="cardContentCover">
                <img src={Dummy1} alt="" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "37px",
                  }}
                >
                  <span className="label">Activity time</span>
                  <span style={{ marginBottom: "25px" }} className="value">
                    256hrs
                  </span>
                  <span className="label">Used on</span>
                  <span className="value">10 devices</span>
                </div>
              </div>
            </Cards>
          </Col>
        </Row>
        <Row>
          <Cards headless>
            <span className="title">Most Active Media</span>
            <div style={{ paddingTop: "24px" }}>
              <div className="sub-title">Stores Saled Trends</div>
              <Col md={17}>
                <Column {...config} />
              </Col>
            </div>
          </Cards>
        </Row>

        {/* <Suspense
          fallback={
            <Cards headless>
              <Column {...config} />
            </Cards>
          }
        >
          <CardGroup />
        </Suspense> */}
        <Row gutter={40}>
          {/* <Col span={18}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <AccountGroup />
            </Suspense>
          </Col> */}
          {/* <Col span={6}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Subscription />
            </Suspense>
          </Col> */}
        </Row>
      </Main>
    </>
  );
};

export default Dashboard;
