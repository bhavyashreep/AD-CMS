import {
  getCustomerList,
  getCustomerDetails,
  // onSubmit,
  // onDelete,
  onEdit,
  onPropEdit,
  onImageDelete,
} from "../../../infrastructure/customer";
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
    (params, history) =>
    async ({ setState }) => {
      console.log("visible");
      // setState({ viewVisible: params.value });
      if (params?.id) {
        const CustomerDet = await getCustomerDetails(params?.id);
        console.log("customer details", CustomerDet);
        setState({ singleRow: CustomerDet.data });
      }
      params.history.push(`/viewCustomer/${params.id}`);
    },
  customerDetails:
    (params) =>
    async ({ setState }) => {
      console.log("cussssss")

      const CustomerDet = await getCustomerDetails(params);
      console.log("cus det",CustomerDet)
      setState({ singleRow: CustomerDet?.data });
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

      // setState({ singleRow: params.data });
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
  getCustomer:
    () =>
    async ({ setState, dispatch }) => {
      try {
        const customerRes = await getCustomerList();
        console.log("customer list", customerRes.data);
        setState({ customerList: customerRes.data });
        dispatch(actions.setSearchData(customerRes.data));
      } catch (error) {
        logError(error);
      }
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
  onPropertyEdit:
    (params, id) =>
    ({ dispatch }) => {
      logError(params, "Edit value");
      var form_data = new FormData();
      for (var key in params) {
        form_data.append(key, params[key]);
      }
      const editRes = onPropEdit(form_data, id);

      dispatch(actions.getCustomer());
      dispatch(actions.customerDetails(id));
      dispatch(actions.setVisibleEdit(false));
    },
  onImgDelete:
    (prop_id, image_id,cus_id) =>
    ({ dispatch }) => {
      logError(prop_id, "Edit value");

      const editRes = onImageDelete({prop_id,image_id});
      console.log("delete res",editRes)
      dispatch(actions.customerDetails(cus_id));
      dispatch(actions.setVisibleEdit(false));
    },
    addImage:
    (file,prop_id) =>
    ({ dispatch }) => {
      logError(file, "add value");

      // const editRes = onImageDelete({prop_id,image_id});
      // console.log("delete res",editRes)
      // dispatch(actions.customerDetails(cus_id));
      // dispatch(actions.setVisibleEdit(false));
    },

    

  // onDelete:
  //   (params) =>
  //   async ({ dispatch }) => {
  //     try {
  //       await onDelete(params);
  //       message.success("Succesfully Deleted");
  //       dispatch(actions.getCustomer());
  //     } catch (error) {
  //       logError(error);
  //     }
  //   },
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
