import { get, post, del,patch } from "../common/remote/base_api";



export const getProfileDetails = (params) => {
  return get(`home247/profile/`);
};
export const onEdit = (params,id) => {
  return patch(`home247/customer-update/${id}/`, params);
};




