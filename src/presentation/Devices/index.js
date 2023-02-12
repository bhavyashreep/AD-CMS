import React, { lazy, Suspense, useEffect } from "react";
import { Row, Col, Skeleton, Popconfirm, Button } from "antd";
import { PageHeader } from "../common/UI/page-headers/page-headers";
import { Cards } from "../common/UI/cards/frame/cards-frame";
import { Main, MapCard } from "../styled";
// import { useDashboardStore } from "./store";
import DeviceList from "./overview/DeviceList";

const CardGroup = lazy(() => import("./overview/OfflineDevices"));
const AccountGroup = lazy(() => import("./overview/Map"));
const Subscription = lazy(() => import("./overview/OnlineDevices"));

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
            <CardGroup />
          </Col>
          <Col md={17} style={{ height: "100%" }}>
            <MapCard>
              <Cards headless size="large" style={{ padding: "0!important" }}>
                <AccountGroup />
              </Cards>
            </MapCard>
          </Col>
        </Row>
        <Row gutter={15}>
          <Col md={24}>
            <Cards headless>
              <DeviceList />
            </Cards>
          </Col>
        </Row>

        <Row gutter={40}></Row>
      </Main>
    </>
  );
};

export default Dashboard;
