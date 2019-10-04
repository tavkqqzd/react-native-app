import {
  GET_CLUB_DATA,
  GET_USER_DATA,
  STORE_GAME_DATA,
  SET_EMPLOYEE_TYPE,
  LIST_OF_EMPLOYEE_TYPES
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
