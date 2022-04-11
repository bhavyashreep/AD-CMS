import {
  getStudentList,
  onSubmit,
  onDelete,
  onEdit,
  createNotification,
} from "../../../infrastructure/student";
import { logError } from "../../common/Utils";
import { message } from "antd";
import firebase from "../../../config/api/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const webinarData = firebase.database().ref("/webinar");
const notificationData = firebase.database().ref("notification");
const storage = getStorage();

const actions = {
  onSubmit:
    (values) =>
    async ({ setState, dispatch }) => {
      try {
        await onSubmit(values);
        dispatch(actions.setVisible(false));
        dispatch(actions.getStudent());
      } catch (error) {
        logError(error);
      }
    },
  setVisible:
    (params) =>
    ({ setState }) => {
      setState({ viewVisible: params.value });
      setState({ singleRow: params.data });
    },
  setVisibleCreate:
    (params) =>
    ({ setState }) => {
      console.log("done", params);
      setState({ VisibleCreate: params.value });
    },
  setSearchData:
    (params) =>
    ({ setState }) => {
      setState({ searchData: params });
    },
  onfinish:
    (values, image, form, setImageUrl, setimage) =>
    async ({ setState, dispatch }) => {
      if (Object.keys(image).length === 0) {
        message.warning("Please  ulpoad the image");
      } else {
        setState({ loader: true });
        const storageRef = ref(storage, image.name);
        const UploadedData = await uploadBytes(storageRef, image);
        const url = await getDownloadURL(UploadedData.ref);

        const key = notificationData.push().key;
        var data = {
          ...values,
          image: url,
          id: key,
        };
        // delete data.type
        if (values.type === undefined) {
          data.type = 1;
        }

        console.log(values, key);
        try {
          let notifiRes;
          let ispremium;
          let expertid;
          if (values.webinar) {
            webinarData.on("value", (snapshot) => {
              if (snapshot.val() !== null) {
                let responselist = Object.values(snapshot.val());
                // setState({ webinarData: responselist });
                // dispatch(actions.setSearchData(responselist));
                console.log(responselist, "webinar");
                for (let i = 0; i < responselist?.length; i++) {
                  console.log("yesss");
                  if (responselist[i].id === values?.webinar) {
                    console.log("yesss2", responselist[i]);

                    ispremium = responselist[i].premium;
                    expertid = responselist[i].presentor;
                  }
                }
              }
            });
            notifiRes = await createNotification({
              title: values?.title,
              message: values?.description,
              webinar_id: values?.webinar,
              image_url: url,
              topic: "happybump",
              message_data: {
                webinar_id: values?.webinar,
                ispremium: ispremium,
                expertid: expertid,
              },
            });
          } else {
            notifiRes = await createNotification({
              title: values?.title,
              message: values?.description,
              url: values?.url,
              image_url: url,
              topic: "happybump",
              message_data: { url: values?.url },
            });
          }
          console.log("notifiRes", notifiRes);
          await notificationData.child(key).update(data);
          dispatch(actions.setVisibleCreate(false));
          dispatch(actions.getStudent());
          form.resetFields();
          setImageUrl("");
          setimage({});
          setState({ loader: false });
        } catch (error) {
          setState({ loader: false });
          logError(error);
        }
      }
    },
  getWebinar:
    () =>
    async ({ setState, dispatch }) => {
      try {
        webinarData.on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            let responselist = Object.values(snapshot.val());
            setState({ webinarData: responselist });
            // dispatch(actions.setSearchData(responselist));
            console.log(responselist, "webinar");
          }
        });
      } catch (error) {
        logError(error);
      }
    },
  getStudent:
    () =>
    async ({ setState, dispatch }) => {
      try {
        dispatch(actions.getWebinar());
        notificationData.on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            let responselist = Object.values(snapshot.val());
            console.log(responselist, "data checfk");
            setState({ studentList: responselist });
            dispatch(actions.setSearchData(responselist));
          } else if (snapshot.val() === null) {
            setState({ studentList: [] });
            dispatch(actions.setSearchData([]));
          }
        });
      } catch (error) {
        logError(error);
      }
    },
  setEditVisible:
    (params) =>
    ({ setState }) => {
      setState({ editVisible: params.value });
      setState({ singleRow: params.data });
    },
  onEdit:
    (params) =>
    ({ dispatch }) => {
      logError(params, "Edit value");
      dispatch(actions.getStudent());
    },
  onDelete:
    (params) =>
    async ({ dispatch }) => {
      try {
        await onDelete(params);
        message.success("Succesfully Deleted");
        dispatch(actions.getStudent());
      } catch (error) {
        logError(error);
      }
    },
  getCourse:
    (page) =>
    async ({ setState }) => {
      try {
        const res = await getStudentList(page);
        setState({ course: res });
        setState({ pageNumber: page });
      } catch (error) {
        logError(error);
      }
    },
};

export default actions;
