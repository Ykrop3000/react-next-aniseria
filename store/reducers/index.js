import { combineReducers } from "redux";
import listReducer from "./listReducer";
import constantReducer from "./constantReducer";
import userReducer from "./userReducer";

export default combineReducers({
  list: listReducer,
  constant: constantReducer,
  user: userReducer,
});
