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
import images from "../Themes/Images";

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
    SignUp: { screen: SignUp }
  },
  {
    initialRouteName: "SignUp",
    headerLayoutPreset: "center"
  }
);

const RootNavigator = createAppContainer(PostLoginNavigators);

// const App = () => {
//   return (
//     <Provider store={store}>
//       <APP />
//     </Provider>
//   );
// };

export default RootNavigator;
