
const routes = {
  INITIAL: "/",
  SIGNUP: "/signup",
  // DASHBOARD :"/dashboard",
  CUSTOMERLIST :"/customerlist",
  REGIONLIST :"/regionlist",
  PINCODELIST:"/pincodelist/:id",
  EXPERTS:`/experts`,
  VIEWCUSTOMER:"/viewCustomer/:id",
  PAYMENTLIST:"/paymentList",
  AUTHLETTER:"/authLetter/:id/:index",
  PROFILE:"/profile"
};

// Change initial route if required
routes.LOGIN = routes.INITIAL;

export { routes };
