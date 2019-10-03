import { GET_CLUB_DATA, GET_USER_DATA, STORE_GAME_DATA } from "./actionTypes";

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
