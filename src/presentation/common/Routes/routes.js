const routes = {
  INITIAL: "/",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  CUSTOMERLIST: "/campaignlist",
  CAMPAIGNEXPANDED: "/campaignlist/:id",
  DEVICES: "/devices",
  REGIONLIST: "/regionlist",
  PINCODELIST: "/pincodelist/:id",
  EXPERTS: `/experts`,
  VIEWCUSTOMER: "/viewCustomer/:id",
  PAYMENTLIST: "/paymentList",
  AUTHLETTER: "/authLetter/:id/:index",
  CONSENTLETTER: "/consentLetter/:id/:index",
  PROFILE: "/profile",
  SERVICEREQUESTS: "/serviceRequests",
  VIEWSERVICE: "/viewService/:id",
};

// Change initial route if required
routes.LOGIN = routes.INITIAL;

export { routes };
