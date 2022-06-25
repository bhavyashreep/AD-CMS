import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const ProfileStore = createStore({
  name: "ProfileStore",
  initialState,
  actions,
});

export const useProfileStore = createHook(ProfileStore, {
  selector: (state) => state,
});
