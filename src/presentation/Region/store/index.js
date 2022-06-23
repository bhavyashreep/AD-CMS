import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const RegionStore = createStore({
  name: "RegionStore",
  initialState,
  actions,
});

export const useRegionStore = createHook(RegionStore, {
  selector: (state) => state,
});
