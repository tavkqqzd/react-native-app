import * as actionTypes from "../Actions/actionTypes";

export const initialState = {
  clubData: "",
  userData: "",
  gameData: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLUB_DATA:
      return {
        ...state,
        clubData: action.data
      };
    case actionTypes.GET_USER_DATA:
      return {
        ...state,
        userData: action.data
      };
    case actionTypes.STORE_GAME_DATA:
      return {
        ...state,
        gameData: action.data
      };
    default:
      return state;
  }
};

export default reducer;
