// import React from "react";
// import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";
// import Splash from "../Containers/Splash/Splash";
// import CP_Login_SignUp from "../Containers/CP_Login_SignUp/CP_Login_SignUp";
// import SignUp from "../Containers/CP_Login_SignUp/SignUp";
// import Login from "../Containers/CP_Login_SignUp/Login";
// import images from "../Themes/Images";

// const PreLoginNavigator = createStackNavigator(
//   {
//     Splash: { screen: Splash },
//     CP_Login_SignUp: { screen: CP_Login_SignUp }
//   },
//   {
//     initialRouteName: "Splash",
//     headerMode: "none"
//   }
// );

// const PostLoginNavigators = createStackNavigator(
//   {
//     Login: { screen: Login },
//     SignUp: { screen: SignUp }
//   },
//   {
//     initialRouteName: "Login",
//     headerLayoutPreset: "center"
//   }
// );

// const RootNav = createSwitchNavigator(
//   {
//     PreLogin: PreLoginNavigator,
//     Post_Login_SignUp: PostLoginNavigators
//   },
//   {
//     headerMode: "none"
//   }
// );

// const RootNavigator = createAppContainer(RootNav);

// export default RootNavigator;

import React from "react";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createAppContainer, createStackNavigator, createSwitchNavigator } from "react-navigation";
import Splash from "../Containers/Splash/Splash";
import CP_Login_SignUp from "../Containers/CP_Login_SignUp/CP_Login_SignUp";
import SignUp from "../Containers/CP_Login_SignUp/SignUp";
import Login from "../Containers/CP_Login_SignUp/Login";
import combineReducersIndex from "../Store/Reducer/index";
import { Provider } from "react-redux";
import EnterClubId from "../Containers/CP_Login_SignUp/EnterClubId";
import HelpWithPassword from "../Containers/ResetPassword/HelpWithPassword";
import EnterVerificationCode from "../Containers/ResetPassword/EnterVerificationCode";
import MobileNumberVerified from "../Containers/ResetPassword/MobileNumberVerified";
import DashboardPage from "../Containers/CP_Dashboard/Dashboard";
import Profile from "../Containers/CP_Dashboard/Profile";
import LeaderBoard from "../Containers/CP_Dashboard/LeaderBoard";

const PreLoginNavigator = createStackNavigator(
  {
    Splash: { screen: Splash },
    CP_Login_SignUp: { screen: CP_Login_SignUp }
  },
  {
    initialRouteName: "Splash",
    headerMode: "none"
  }
);

const PostLoginNavigators = createStackNavigator(
  {
    Login: { screen: Login },
    EnterClubId: { screen: EnterClubId },
    SignUp: { screen: SignUp },
    DashboardPage: { screen: DashboardPage },
    Profile: { screen: Profile },
    LeaderBoard: { screen: LeaderBoard }
  },
  {
    initialRouteName: "EnterClubId",
    headerLayoutPreset: "center"
  }
);

const ResetPasswordNavigattor = createStackNavigator(
  {
    HelpWithPassword: { screen: HelpWithPassword },
    EnterVerificationCode: { screen: EnterVerificationCode },
    MobileNumberVerified: { screen: MobileNumberVerified }
  },
  {
    initialRouteName: "HelpWithPassword",
    headerLayoutPreset: "center"
  }
);

const RootNav = createSwitchNavigator(
  {
    PreLogin: PreLoginNavigator,
    Post_Login_SignUp: PostLoginNavigators,
    ResetPassword: ResetPasswordNavigattor
  },
  {
    headerMode: "none"
  }
);

const RootNavigator = createAppContainer(RootNav);
const store = createStore(combineReducersIndex);
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
