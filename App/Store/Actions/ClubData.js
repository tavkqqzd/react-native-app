import {
  GET_CLUB_DATA,
  GET_USER_DATA,
  STORE_GAME_DATA,
  SET_EMPLOYEE_TYPE,
  LIST_OF_EMPLOYEE_TYPES,
  GET_LEADERBOARD,
  GET_LEADERBOARD_FOR_LOGGED_USER,
  GET_QUESTIONS,
  SELECTED_GAME,
  INDEX_OF_QUESTION,
  PROFILE_IMG_S3_LOCATION
} from "./actionTypes";

export const getClubData = data => {
  return {
    type: GET_CLUB_DATA,
    data: data
  };
};

export const getUserData = data => {
  return {
    type: GET_USER_DATA,
    data: data
  };
};

export const storeGameData = data => {
  return {
    type: STORE_GAME_DATA,
    data: data
  };
};

export const listOfEmployeeTypes = data => {
  return {
    type: LIST_OF_EMPLOYEE_TYPES,
    data: data
  };
};

export const setEmployeeType = data => {
  return {
    type: SET_EMPLOYEE_TYPE,
    data: data
  };
};

export const getLeaderBoard = data => {
  return {
    type: GET_LEADERBOARD,
    data: data
  };
};

export const getLeaderBoardForLoggedUser = data => {
  return {
    type: GET_LEADERBOARD_FOR_LOGGED_USER,
    data: data
  };
};

export const getQuestions = data => {
  return {
    type: GET_QUESTIONS,
    data: data
  };
};

export const selectedGame = data => {
  return {
    type: SELECTED_GAME,
    data: data
  };
};

export const indexOfQuestion = data => {
  return {
    type: INDEX_OF_QUESTION,
    data: data
  };
};

export const profileImageS3UploadLocation = data => {
  return {
    type: PROFILE_IMG_S3_LOCATION,
    data: data
  };
};
