import { get, post, del,patch } from "../common/remote/base_api";


export const getPincodeList = (params) => {
  return get(`/home247/pincode-list-view/${params}/`);
};
export const addPincode = (params) => {
  return post(`home247/pincode-create/`,params);
};
