import { combineReducers } from "redux";
import listReducer from "./listReducer";
import constantReducer from "./constantReducer";

export default combineReducers({
    list: listReducer,
    constant: constantReducer
});