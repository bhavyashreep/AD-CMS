import { get, post, del,patch } from "../common/remote/base_api";

export const onSubmit = (params) => {
  return post("/admin/add-student", params, {
    "Content-Type": "multipart/form-data",
  });
};
export const getCustomerList = () => {
  return get("home247/customers-list/");
};

export const getCustomerDetails = (params) => {
  return get(`home247/customer/${params}`);
};
export const onEdit = (params,id) => {
  return patch(`home247/customer-update/${id}/`, params);
};
export const onPropEdit = (params,id) => {
  return patch(`home247/property-update/${id}/`, params);
};

export const onImageDelete = (params) => {
  console.log("on image delete")
  return del(`home247/property-image/delete/${params.prop_id}/`, params);
};

export const onDelete = (params) => {
  return post("/admin/delete-student", params);
};

export const onCreateWebinar = (params) => {
  return post("https://zoom-api-2021.herokuapp.com/webinar/create", params);
};
export const deleteZoom = (params) => {
  console.log(params, "delete");
  return del(`https://zoom-api-2021.herokuapp.com/webinar/${params}`, params);
};
export const editZoom = (params) => {
  console.log(params, "update");
  return patch(`https://zoom-api-2021.herokuapp.com/webinar/update/${params.id}`, params);
};
export const createNotification=(params)=>{
  return post(`https://zoom-api-2021.herokuapp.com/pushnotification`,params);
}