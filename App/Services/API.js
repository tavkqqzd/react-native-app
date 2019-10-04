import { IP_ADDRESS } from "./config";
import DeviceInfo from "react-native-device-info";

export const validateClubID = clubId => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    let status = undefined;
    fetch(`${IP_ADDRESS}/cpa/club_validation/${clubId}`, data)
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(responseObj => {
        return resolve({ status, data: responseObj });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const login = (mobileNumber, password, clubId) => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [
          {
            mobileNumber: mobileNumber,
            password: password,
            clubId: clubId
          }
        ]
      })
    };
    fetch(`${IP_ADDRESS}/cpa/player_login/`, data)
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(responseObj => {
        return resolve({ status, data: responseObj });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const getGameAndUserDetail = (empCode, clubId, start, end, playerId) => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    // localhost:8000/cpa/games_list/?set=0&limit=10&employeeTypeCode=0&clubId=CLUAPP001
    fetch(
      `${IP_ADDRESS}/cpa/games_list/?set=${start}&limit=${end}&employeeTypeCode=${empCode}&clubId=${clubId}&playerId=${playerId}`,
      data
    )
      .then(res => {
        status = res.status;
        return res.json();
      })
      .then(responseObj => {
        return resolve({ status, data: responseObj });
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const generateOTP = mobilenumber => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [
          {
            mobilenumber: mobilenumber,
            identity: 2
          }
        ]
      })
    };

    fetch(`${IP_ADDRESS}/otpgenerator/`, data)
      .then(res => {
        return resolve(res.json());
      })
      .catch(err => {
        return reject(err);
      });
  });
};

export const compareOTP = (mobilenumber, OTP) => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: [
          {
            mobilenumber: mobilenumber,
            OTP: OTP,
            identity: 1
          }
        ]
      })
    };
    console.log("sending", data);
    fetch(`${IP_ADDRESS}/optcompare/`, data)
      .then(res => {
        return resolve(res.json());
      })
      .catch(err => {
        return reject(err);
      });
  });
};
