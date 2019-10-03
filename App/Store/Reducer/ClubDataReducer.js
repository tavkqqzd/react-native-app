import * as actionTypes from "../Actions/actionTypes";

export const initialState = {
  clubData: "",
  userData: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLUB_DATA:
      console.log("state data", state, action.data);
      return {
        ...state,
        clubData: action.data
      };
    case actionTypes.GET_USER_DATA:
      console.log("state data", state, action.data);
      return {
        ...state,
        userData: action.data
      };
    default:
      return state;
  }
};

export default reducer;
