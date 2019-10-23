import React from "react";
import { NavigationActions } from "react-navigation";
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback, Button } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import colors from "../../Themes/Colors";
import image from "../../Themes/Images";
import Metrics from "../../Themes/Metrics";
import Fonts from "../../Themes/Fonts";
import * as ActivityStyles from "../../Themes/ActivityStyles";
import Modal from "../../Components/Modal/Modal";
import { widthPercentageToDP, heightPercentageToDP } from "../../Components/Utils/PercentageToPixels";
import { forInStatement } from "@babel/types";

const navigateToSignUpPage = NavigationActions.navigate({
  routeName: "EnterClubId",
  action: NavigationActions.navigate({ routeName: "EnterClubId" })
});

const navigateToLoginPage = NavigationActions.navigate({
  routeName: "Login",
  action: NavigationActions.navigate({ routeName: "Login" })
});

class CP_Login_SignUp extends React.Component {
  state = {
    modalVisible: false
  };
  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };
  nav = (obj, cb) => {
    this.props.navigation.dispatch(obj);
    cb();
  };
  render() {
    return (
      <View style={[ActivityStyles.centerAlignment.centerAlignment]}>
        <View style={([css.logoStyle], { backgroundColor: "white" })}>
          <Image source={image.blueLogo} />
        </View>
        <View style={css.margin}>
          <Text style={css.clubPassportInfo}>Welcome to Club Passport</Text>
          <Text style={[css.clubPassportHeadInfo, { marginTop: 10 }]}>
            {" "}
            Your ticket to the Gamification of Learning
          </Text>
        </View>
        <View style={{ marginTop: 140 }}>
          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleModal();
            }}
          >
            <Image source={image.circularButtonUpArrow} style={css.circleButton} />
          </TouchableWithoutFeedback>
        </View>
        <Modal
          modalState={this.state.modalVisible}
          toggleModal={this.toggleModal}
          modalType="loginModal"
          navigateToLoginPage={navigateToLoginPage}
          navigateToSignUpPage={navigateToSignUpPage}
          nav={this.nav}
        />
      </View>
    );
  }
}

const css = StyleSheet.create({
  margin: {
    marginTop: Metrics.section
  },
  clubPassportInfo: {
    fontFamily: Fonts.Fonts.CA_book,
    fontSize: 18,
    textAlign: "center",
    color: colors.black
  },
  clubPassportHeadInfo: { fontFamily: Fonts.Fonts.CA_book, fontSize: 19, textAlign: "center", color: colors.black },
  logoStyle: {
    width: widthPercentageToDP("22%"),
    height: heightPercentageToDP("22%")
  },
  circleButton: {
    width: 80,
    height: 80
  }
});

export default CP_Login_SignUp;
