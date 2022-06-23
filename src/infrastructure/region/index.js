import { get, post, del,patch } from "../common/remote/base_api";


export const getRegionList = () => {
  return get("home247/region-list-view/");
};
export const getPincodeList = (params) => {
  return get(`/home247/pincode-list-view/${params}/`);
};
export const addRegion = (params) => {
  return post(`home247/region-create/`,params);
};

export const onEdit = (params,id) => {
  return patch(`home247/region-update/${id}/`,params);
};
export const onDelete = (id) => {
  return del(`home247/region-delete/${id}/`);
};




