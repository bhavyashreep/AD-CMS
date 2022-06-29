import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const ServiceReqStore = createStore({
  name: "ServiceReqStore",
  initialState,
  actions,
});

export const useServiceReqStore = createHook(ServiceReqStore, {
  selector: (state) => state,
});
