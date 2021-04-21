import { VIEWMODE } from "./types";

export function viewMode() {
  return function(dispatch) {
    dispatch({ type: VIEWMODE });
  };
}
