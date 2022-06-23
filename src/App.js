import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { routes } from "./presentation/common/Routes";
import { theme } from "./presentation/common/Theme/themeVariables";
import { PrimaryLoadingIndicator } from "./presentation/common/UI/LoadingIndicator";
import store from "./redux/store";
import { Provider } from "react-redux";

//import static css to override antd
import "./presentation/common/Style/style.css";
import LayoutProvider from "./presentation/Layout";
import ViewCustomer from "./presentation/Customer/overview/ViewCustomer";
import PaymentList from "./presentation/PaymentManage";
import AuthLetter from "./presentation/Customer/overview/AuthLetter";

//component imports
const Login = React.lazy(() => import("./presentation/Login"));
// const Dashboard = React.lazy(() => import("./presentation/Dashboard"));
const CustomerList = React.lazy(() => import("./presentation/Customer"));
const RegionList = React.lazy(() => import("./presentation/Region"));
const PincodeList = React.lazy(() => import("./presentation/Pincode"));

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
              {/* {token===null? */}

              <Route exact path={routes.LOGIN} component={Login} />
              <Route exact path={routes.AUTHLETTER} component={AuthLetter} />

              {/* : */}

              <LayoutProvider>
                {/* <Route exact path={routes.DASHBOARD} component={Dashboard} /> */}
                <Route
                  exact
                  path={routes.CUSTOMERLIST}
                  component={CustomerList}
                />
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
                  path={routes.PAYMENTLIST}
                  component={PaymentList}
                />
              </LayoutProvider>
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
