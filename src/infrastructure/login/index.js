import { post } from "../common/remote/base_api";

export const onLogin = (params) => {
  return post("authentication/home247-login/", params);
};
