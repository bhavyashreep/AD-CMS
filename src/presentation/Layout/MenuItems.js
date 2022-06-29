import React from "react";
import { Menu } from "antd";
import { NavLink, useRouteMatch, Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { routes } from "../common/Routes";
import {
  categories,
  dashboard,
  experts,
  notification,
  users,
  webinar,
  review,
  service,
  report,
  subscription,
  admin,
} from "../common/Assets/Icons";

const MenuItems = ({ darkMode, topMenu, events }) => {
  const { SubMenu } = Menu;

  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split("/");

  const [openKeys, setOpenKeys] = React.useState([
    `${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`,
  ]);

  const onOpenChange = (keys) => {
    setOpenKeys(
      keys[keys.length - 1] !== "recharts"
        ? [keys.length && keys[keys.length - 1]]
        : keys
    );
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? "inline" : "horizontal"}
      theme={darkMode && "dark"}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={[
        `${
          mainPathSplit.length === 1
            ? "home"
            : mainPathSplit.length === 2
            ? mainPathSplit[1]
            : mainPathSplit[2]
        }`,
      ]}
      defaultOpenKeys={
        !topMenu
          ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : "dashboard"}`]
          : []
      }
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
       <Menu.Item
        key="serviceReq"
        icon={
          <NavLink className="menuItem-icon" to={routes.SERVICEREQUESTS}>
            <img src={experts} />
          </NavLink>
        }
      >
        <Link to={routes.SERVICEREQUESTS}>Service Requests</Link>
      </Menu.Item>
      <SubMenu
        key="sub1"
        // icon={<ContactSupportIcon style={{ marginRight: "10px" }} />}
        title="Manage "
      >
        <Menu.Item
          key="Manage"
          icon={
            <NavLink className="menuItem-icon" to={routes.CUSTOMERLIST}>
              <img src={users} />
            </NavLink>
          }
        >
          <Link style={{paddingLeft:""}} to={routes.PAYMENTLIST}>Payment Manage</Link>
        </Menu.Item>
        <Menu.Item
          key="Manage"
          icon={
            <NavLink className="menuItem-icon" to={routes.CUSTOMERLIST}>
              <img src={users} />
            </NavLink>
          }
        >
          <Link to={routes.CUSTOMERLIST}>Customer Manage</Link>
        </Menu.Item> <Menu.Item
          key="Manage"
          icon={
            <NavLink className="menuItem-icon" to={routes.CUSTOMERLIST}>
              <img src={users} />
            </NavLink>
          }
        >
          <Link to={routes.REGIONLIST}>Pincode Manage</Link>
        </Menu.Item>
      </SubMenu>
     
      <Menu.Item
        key="blog"
        icon={
          <NavLink className="menuItem-icon" to={routes.EXPERTS}>
            <img src={experts} />
          </NavLink>
        }
      >
        <Link to={routes.PROFILE}>Profile</Link>
      </Menu.Item>
      
    </Menu>
  );
};

export default MenuItems;
