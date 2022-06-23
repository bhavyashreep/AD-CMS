import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const PincodeStore = createStore({
  name: "usePincodeStore",
  initialState,
  actions,
});

export const usePincodeStore= createHook(PincodeStore, {
  selector: (state) => state,
});
