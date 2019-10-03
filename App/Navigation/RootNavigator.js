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
import DashboardPage from "../Containers/CP_Dashboard/Dashboard";
import Profile from "../Containers/CP_Dashboard/Profile";

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
    HelpWithPassword: { screen: HelpWithPassword },
    EnterVerificationCode: { screen: EnterVerificationCode }
  },
  {
    initialRouteName: "Login",
    headerLayoutPreset: "center"
  }
);

const ResetPasswordNavigattor = createStackNavigator(
  {
    HelpWithPassword: { screen: HelpWithPassword },
    EnterVerificationCode: { screen: EnterVerificationCode }
  },
  {
    initialRouteName: "EnterVerificationCode",
    headerLayoutPreset: "center"
  }
);

const RootNavigator = createAppContainer(PostLoginNavigators);
const store = createStore(combineReducersIndex);
const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
