import * as actionTypes from "../Actions/actionTypes";

export const initialState = {
  clubData: "",
  userData: "",
  gameData: "",
  employeeType: "",
  listOfEmployeeTypes: "",
  leaderBoard: "",
  leaderBoardForLoggedUser: "",
  questions: "",
  selectedGame: "",
  indexOfQuestion: "",
  S3UploadUrl: "",
  correctAnswer: "",
  scoreOfPlayer: 0,
  phoneNumber: ""
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
    case actionTypes.SELECTED_GAME:
      return {
        ...state,
        selectedGame: action.data
      };
    case actionTypes.INDEX_OF_QUESTION:
      return {
        ...state,
        indexOfQuestion: action.data
      };
    case actionTypes.PROFILE_IMG_S3_LOCATION:
      return {
        ...state,
        S3UploadUrl: action.data
      };
    case actionTypes.SCORE_OF_PLAYER:
      return {
        ...state,
        scoreOfPlayer: state.scoreOfPlayer + action.data
      };
    case actionTypes.CORRECT_ANSWER:
      return {
        ...state,
        correctAnswer: action.data
      };
    case actionTypes.RESET_SCORE:
      return {
        ...state,
        scoreOfPlayer: 0
      };
    case actionTypes.GET_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.data
      };
    case actionTypes.UPDATE_IMAGE_GLOBALLY:
      return {
        ...state,
        userData: {
          ...state.userData,
          profilePic: action.data
        }
      };
    case actionTypes.UPDATE_USER_PROFILE_DATA: {
      return {
        ...state,
        userData: {
          ...state.userData,
          playerName: action.name,
          emailId: action.email,
          clubMembershipId: action.clubMemId,
          userName: action.optionalName
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
