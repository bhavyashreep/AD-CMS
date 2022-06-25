import {
  getRegionList,
  addRegion,
  onDelete,
  onEdit,
} from "../../../infrastructure/region";
import { addPincode } from "../../../infrastructure/pincode";
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
  setVisible:
    (params) =>
    async ({ setState }) => {
      logError("value",params)
      setState({ VisibleCreate: params });
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
    (values, type) =>
    async ({ setState, dispatch }) => {
      try {
        if (type === 1) {
          await addRegion(values);
          dispatch(actions.setVisibleCreate({value:false}));
          dispatch(actions.getRegionData());
        } else {
          await addPincode(values);
          dispatch(actions.setVisibleCreate({value:false}));
          dispatch(actions.getRegionData());
        }
      } catch (error) {
        logError(error);
      }
      // dispatch(actions.onSubmit(values));
    },
  getRegionData:
    () =>
    async ({ setState, dispatch }) => {
      try {
        const customerRes = await getRegionList();
        console.log("region list", customerRes.data);
        setState({ regionList: customerRes.data });
        dispatch(actions.setSearchData(customerRes.data));
      } catch (error) {
        logError(error);
      }
    },
  onEdit:
    (values,id) =>
    async({ dispatch }) => {
      await onEdit(values,id);
      dispatch(actions.setVisibleEdit({value:false}));
      dispatch(actions.getRegionData());
    },
  onDelete:
    (params) =>
    async ({ dispatch }) => {
      try {
        
        await onDelete(params);
        // message.success("Succesfully Deleted");
        dispatch(actions.getRegionData());
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
