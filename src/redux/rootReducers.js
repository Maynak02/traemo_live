import { combineReducers } from "redux";
import { authApiSliceReducer } from "./Auth/AuthSlice";
import { paymentApiSliceReducer } from "./Payment/PaymentSlice";

const rootReducers = combineReducers({
  registerApi: authApiSliceReducer,
  paymentApi: paymentApiSliceReducer,
});

export default rootReducers;
