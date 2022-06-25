import {
 
  getProfileDetails,
 
  onEdit,
  onPropEdit,
  onImageDelete,
} from "../../../infrastructure/profile";
import { logError } from "../../common/Utils";
import { message } from "antd";
import UserData from "../../../demoData/usersData.json";
import firebase from "../../../config/api/firebase";

const actions = {
  
  // setVisible:
  //   (params, history) =>
  //   async ({ setState }) => {
  //     console.log("visible");
  //     // setState({ viewVisible: params.value });
  //     if (params?.id) {
  //       const CustomerDet = await getCustomerDetails(params?.id);
  //       console.log("customer details", CustomerDet);
  //       setState({ singleRow: CustomerDet.data });
  //     }
  //     params.history.push(`/viewCustomer/${params.id}`);
  //   },
  profileDetails:
    (params) =>
    async ({ setState }) => {
      const profileDet = await getProfileDetails(params);
    logError("responseee",profileDet)
      setState({ profile: profileDet?.data });
    },

  setVisibleCreate:
    (params) =>
    ({ setState }) => {
      console.log("done", params);
      setState({ VisibleCreate: params.value });
    },
  setVisibleEdit:
    (params) =>
    ({ setState }) => {
      console.log("innn");
      console.log(params.data, "data");

      setState({ viewVisibleEdit: params.value });
      setState({ editDetails: params.data });
    },
  onEdit:
    (params, id) =>
    ({ dispatch }) => {
      logError(params, "Edit value");

      const editRes = onEdit(params, id);
      dispatch(actions.getCustomer());
      dispatch(actions.customerDetails(id));
      dispatch(actions.setVisibleEdit(false));
    },
 
 


  
};

export default actions;
