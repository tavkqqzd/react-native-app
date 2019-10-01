import * as actionTypes from "../Actions/actionTypes";

export const initialState = {
  clubData: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLUB_DATA:
      console.log("state data", state, action.data);
      return {
        ...state,
        clubData: action.data
      };

    default:
      return state;
  }
};

export default reducer;
