import {
  getPincodeList,
  deletePincode,
  // onSubmit,
  // onDelete,
  onEdit,
} from "../../../infrastructure/pincode";
import { logError } from "../../common/Utils";
import { message } from "antd";
import UserData from "../../../demoData/usersData.json";
import firebase from "../../../config/api/firebase";

const actions = {
  // onSubmit:
  //   (values) =>
  //   async ({ setState, dispatch }) => {
  //     try {
  //       await onSubmit(values);
  //       dispatch(actions.setVisible(false));
  //       dispatch(actions.getCustomer());
  //     } catch (error) {
  //       logError(error);
  //     }
  //   },
  // setVisible:
  //   (params) =>
  //   async({ setState }) => {
  //     console.log("visible")
  //     setState({ viewVisible: params.value });
  //    if(params?.id){
  //          const CustomerDet=await getCustomerDetails(params?.id);
  //     console.log("customer details",CustomerDet)
  //     setState({singleRow:CustomerDet.data})}

  //   },

  setVisibleCreate:
    (params) =>
    ({ setState }) => {
      console.log("done", params);
      setState({ VisibleCreate: params.value });
    },
  setVisibleEdit:
    (params) =>
    ({ setState }) => {
      console.log(params.data, "data");
      setState({ viewVisibleEdit: params.value });
      setState({ singleRow: params.data });
    },
  setSearchData:
    (params) =>
    ({ setState }) => {
      setState({ searchData: params });
    },
  onfinish:
    (values, image) =>
    ({ setState, dispatch }) => {
      const formdata = { ...values, image: image };
      var form_data = new FormData();
      for (var key in formdata) {
        form_data.append(key, formdata[key]);
      }
      dispatch(actions.onSubmit(form_data));
    },
    getPincodeData:
    (id) =>
    async ({ setState, dispatch }) => {
      try {
        const customerRes = await getPincodeList(id);
        console.log("region list", customerRes.data);
        setState({ pincodeList: customerRes.data });
        dispatch(actions.setSearchData(customerRes.data));
      } catch (error) {
        logError(error);
      }
    },
  onEdit:
    (params) =>
    ({ dispatch }) => {
      logError(params, "Edit value");
      dispatch(actions.getData());
    },
  onDelete:
    (params) =>
    async ({ dispatch }) => {
      try {
        logError("pincode",params)
        await deletePincode(params.id);
        message.success("Succesfully Deleted");
        dispatch(actions.getPincodeData(params?.region));
      } catch (error) {
        logError(error);
      }
    },
  switchChange:
    (status, id) =>
    async ({ setState }) => {
      try {
        console.log(status, "status");
        firebase.database().ref(`/users`).child(id).update({ status: status });
      } catch (error) {}
    },
};

export default actions;
