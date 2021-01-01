import { createStore } from "redux";
import appReducer from "../Redux/AppReducer";

const store = createStore(appReducer);
export default store;