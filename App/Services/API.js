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
    fetch(`${IP_ADDRESS}/clubvalidation/${clubId}`, data)
      .then(res => {
        return resolve(res.json());
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
            userFlag: 0,
            deviceName: DeviceInfo.getModel(),
            deviceOs: DeviceInfo.getSystemName(),
            modelNumber: DeviceInfo.getUniqueID(),
            deviceType: DeviceInfo.getManufacturer(),
            appVersion: DeviceInfo.getVersion(),
            clubId: clubId
          }
        ]
      })
    };

    fetch(`${IP_ADDRESS}/userlogin/`, data)
      .then(res => {
        return resolve(res.json());
      })
      .catch(err => {
        return reject(err);
      });
  });
};
