import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { validateClubID, getGameAndUserDetail } from "../../Services/API";
import Toast from "react-native-toast-native";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { LoginStyles } from "../CP_Login_SignUp/Styles/Login-Styles";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";

const enterVerificationCode = NavigationActions.navigate({
  routeName: "EnterVerificationCode",
  action: NavigationActions.navigate({ routeName: "EnterVerificationCode" })
});

class DashboardPage extends React.Component {
  static navigationOptions = {
    title: "Club Passport",
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerBackImage: images.back,
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      color: Colors.gradientViolet
    },
    headerLeft: <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
  };
  state = {};

  componentDidMount() {
    let y = new Date().getFullYear();
    let m = new Date().getMonth();
    let d = new Date().getDay();
    let arr = [].concat(y, m, d);
    let newArr = arr.join("-");
    let { playerId, clubId, userFlag } = this.props.userLoginData;
    getGameAndUserDetail(playerId, clubId, userFlag, newArr, 0, 0)
      .then(res => {
        console.log("res", res);
      })
      .catch(err => {
        console.log(err, err);
      });
  }

  render() {
    return (
      <View style={SignUpStyles.signUpPageActivity}>
        <Text>Dashboard Page</Text>
      </View>
    );
  }
}

const css = StyleSheet.create({
  header: {
    margin: 15
  },
  headerText: { textAlign: "center" }
});

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData
  };
};

export default connect(
  mapStateToProps,
  null
)(DashboardPage);
