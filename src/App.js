import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { routes } from "./presentation/common/Routes";
import { theme } from "./presentation/common/Theme/themeVariables";
import { PrimaryLoadingIndicator } from "./presentation/common/UI/LoadingIndicator";
import store from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";
import "antd/dist/antd.css";
// import "antd/dist/reset.css";
//import static css to override antd
import "./presentation/common/Style/style.css";
import LayoutProvider from "./presentation/Layout";
import ViewCustomer from "./presentation/Campaign/overview/ViewCustomer";
import PaymentList from "./presentation/PaymentManage";

import Profile from "./presentation/Profile";

import ServiceRequests from "./presentation/ServiceRequests";
import ViewService from "./presentation/ServiceRequests/overview/ViewService";

//component imports
const Login = React.lazy(() => import("./presentation/Login"));
const Dashboard = React.lazy(() => import("./presentation/Dashboard"));
const CampaignList = React.lazy(() => import("./presentation/Campaign"));
const RegionList = React.lazy(() => import("./presentation/Region"));
const PincodeList = React.lazy(() => import("./presentation/Pincode"));
const CampaignExpanded = React.lazy(() =>
  import("./presentation/Campaign/components/Expanded")
);
const Devices = React.lazy(() => import("./presentation/Devices"));

const token = localStorage.getItem("token");
console.log("token in app js", token);
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider
        theme={{ ...theme, rtl: false, topMenu: false, darkMode: false }}
      >
        <Router>
          <Suspense
            fallback={
              <PrimaryLoadingIndicator
                text="Loading...Breath in...Breath out..."
                isFullPage
              />
            }
          >
            <Switch>
              <Route exact path={routes.LOGIN} component={Login} />
              <LayoutProvider>
                <Route exact path={routes.DASHBOARD} component={Dashboard} />
                <Route
                  exact
                  path={routes.CUSTOMERLIST}
                  component={CampaignList}
                />
                <Route
                  exact
                  path={routes.CAMPAIGNEXPANDED}
                  component={CampaignExpanded}
                />
                <Route exact path={routes.DEVICES} component={Devices} />
                <Route exact path={routes.REGIONLIST} component={RegionList} />
                <Route
                  exact
                  path={routes.PINCODELIST}
                  component={PincodeList}
                />
                <Route
                  exact
                  path={routes.VIEWCUSTOMER}
                  component={ViewCustomer}
                />
                <Route
                  exact
                  path={routes.SERVICEREQUESTS}
                  component={ServiceRequests}
                />
                <Route
                  exact
                  path={routes.VIEWSERVICE}
                  component={ViewService}
                />
                <Route
                  exact
                  path={routes.PAYMENTLIST}
                  component={PaymentList}
                />
                <Route exact path={routes.PROFILE} component={Profile} />
              </LayoutProvider>
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
