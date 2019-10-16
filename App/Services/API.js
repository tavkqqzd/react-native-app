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
            clubId: clubId,
            deviceName: DeviceInfo.getModel(),
            deviceOs: DeviceInfo.getSystemName(),
            deviceId: DeviceInfo.getUniqueID(),
            deviceType: DeviceInfo.getManufacturer(),
            appVersion: DeviceInfo.getVersion()
            // deviceId: DeviceInfo.getUniqueID()
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

export const signUp = (
  name,
  emailId,
  username,
  password,
  clubId,
  clubMembershipId,
  mobileNumberCode,
  mobileNumber,
  profileImageUrl,
  employeeTypeCode
) => {
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
            name: name,
            emailId: emailId,
            username: username,
            password: password,
            clubId: clubId,
            clubMembershipId: clubMembershipId,
            mobileNumberCode: mobileNumberCode,
            mobileNumber: mobileNumber,
            profileImage: profileImageUrl,
            deviceName: DeviceInfo.getModel(),
            deviceOs: DeviceInfo.getSystemName(),
            deviceId: DeviceInfo.getUniqueID(),
            deviceType: DeviceInfo.getManufacturer(),
            appVersion: DeviceInfo.getVersion(),
            employeeTypeCode: employeeTypeCode
          }
        ]
      })
    };
    console.log("data", data);
    fetch(`${IP_ADDRESS}/cpa/player_signup/`, data)
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
            mobileNumber: mobilenumber,
            identity: 1
          }
        ]
      })
    };
    fetch(`${IP_ADDRESS}/otp_generator/`, data)
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

export const getEmployeeType = clubId => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    fetch(`${IP_ADDRESS}/cpa/employee_types/?clubId=${clubId}`, data)
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
            mobileNumber: mobilenumber,
            otp: OTP,
            identity: 1
          }
        ]
      })
    };
    fetch(`${IP_ADDRESS}/otp_validator/`, data)
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

export const setNewPassword = (mobilenumber, password) => {
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
            mobileNumber: mobilenumber,
            password: password
          }
        ]
      })
    };
    fetch(`${IP_ADDRESS}/cpa/forgot_password/`, data)
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

export const getLeaderBoard = clubId => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    let status = undefined;
    fetch(`${IP_ADDRESS}/cpa/leaderborad/?clubId=${clubId}`, data)
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

export const getLeaderBoardForLoggedInUser = (clubId, playerId) => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    let status = undefined;
    fetch(`${IP_ADDRESS}/cpa/player_leaderborad/?clubId=${clubId}&playerId=${playerId}}`, data)
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

export const getLeaderBoardForGameIdOfLoggedInUser = (clubId, gameId) => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
    let status = undefined;
    fetch(`${IP_ADDRESS}/cpa/leaderborad/?clubId=${clubId}&gameId=${gameId}`, data)
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

export const getQuestions = gameId => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        gameId: gameId
      }
    };
    let status = undefined;
    fetch(`${IP_ADDRESS}/cpa/questions_and_answers/`, data)
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

export const sumbitAnswer = obj => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: obj
      })
    };
    let status = undefined;
    fetch(`${IP_ADDRESS}/cpa/game/submit_answer`, data)
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

export const editProfile = obj => {
  return new Promise((resolve, reject) => {
    let data = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: obj
      })
    };
    let status = undefined;
    fetch(`${IP_ADDRESS}/cpa/player_details_update/`, data)
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
