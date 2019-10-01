import { GET_CLUB_DATA } from "./actionTypes";

export const getClubData = data => {
  return {
    type: GET_CLUB_DATA,
    data: data
  };
};
