import * as actionTypes from "../Actions/actionTypes";

export const initialState = {
  clubData: "",
  userData: "",
  gameData: "",
  employeeType: "",
  listOfEmployeeTypes: "",
  leaderBoard: "",
  leaderBoardForLoggedUser: "",
  questions: ""
};

createNewArrayToRender = arr => {
  let arrayToPush = [];
  let object = {};
  arr.map(
    k => (
      (object = {}),
      (object["id"] = k.id),
      (object["value"] = k.employeeType),
      (object["seqId"] = k.seqId),
      arrayToPush.push(object)
    )
  );
  return arrayToPush;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CLUB_DATA:
      console.log("GET_CLUB_DATA", action.data);
      return {
        ...state,
        clubData: action.data
      };
    case actionTypes.GET_USER_DATA:
      console.log("GET_USER_DATA", action.data);
      return {
        ...state,
        userData: action.data
      };
    case actionTypes.STORE_GAME_DATA:
      return {
        ...state,
        gameData: action.data
      };
    case actionTypes.SET_EMPLOYEE_TYPE:
      return {
        ...state,
        employeeType: action.data
      };
    case actionTypes.LIST_OF_EMPLOYEE_TYPES:
      return {
        ...state,
        listOfEmployeeTypes: action.data
      };
    case actionTypes.GET_LEADERBOARD:
      return {
        ...state,
        leaderBoard: action.data
      };
    case actionTypes.GET_LEADERBOARD_FOR_LOGGED_USER:
      return {
        ...state,
        leaderBoardForLoggedUser: action.data
      };
    case actionTypes.GET_QUESTIONS:
      return {
        ...state,
        questions: action.data
      };

    default:
      return state;
  }
};

export default reducer;
