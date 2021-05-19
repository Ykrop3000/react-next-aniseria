import { USER, TOKEN } from "../actions/types";

const initialState = {
  user: {},
  isLogged:
    typeof window != "undefined" && window.document
      ? !!localStorage.getItem("token")
      : false,
};

export default function user(state = initialState, action) {
  if (action.type === USER) {
    if (Object.keys(action.payload).length == 0) {
      localStorage.removeItem("token");
    }
    return {
      ...state,
      user: action.payload,
      isLogged: Object.keys(action.payload).length == 0 ? false : true,
    };
  }
  if (action.type === TOKEN) {
    return {
      ...state,
      isLogged: true,
    };
  }
  return state;
}
