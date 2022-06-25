import { createStore, createHook } from "react-sweet-state";
import initialState from "./initialState";
import actions from "./actions";

const PaymentStore = createStore({
  name: "PaymentStore",
  initialState,
  actions,
});

export const usePaymentStore = createHook(PaymentStore, {
  selector: (state) => state,
});
