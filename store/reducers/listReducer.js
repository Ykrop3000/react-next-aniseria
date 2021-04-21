import { VIEWMODE, ANIMES } from "../actions/types";

const initialState = {
  viewMode: "grid",
  animes: {},
};

export default function list(state = initialState, action) {
  if (action.type === VIEWMODE) {
    return {
      ...state,
      viewMode: action.payload,
    };
  }
  if (action.type === ANIMES) {
    return {
      ...state,
      animes: action.payload,
    };
  }

  return state;
}
