import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { centerAlignment } from "../../Themes/ActivityStyles";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { compareOTP } from "../../Services/API";
import Toast from "react-native-toast-native";
import { LoginStyles } from "../CP_Login_SignUp/Styles/Login-Styles";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import OtpInputs from "react-native-otp-inputs";
import Fonts from "../../Themes/Fonts";

const navigateToMobileNumberVerified = number =>
  NavigationActions.navigate({
    routeName: "MobileNumberVerified",
    action: NavigationActions.navigate({ routeName: "MobileNumberVerified" }),
    params: number
  });

class EnterVerificationCode extends React.Component {
  static navigationOptions = {
    title: "Enter Verification Code",
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

  state = {
    code: ""
  };

  compareOTP = (phNumber, OTPCode) => {
    compareOTP(phNumber, OTPCode)
      .then(res => {
        if (res.status === 200) {
          this.props.navigation.dispatch(navigateToMobileNumberVerified(phNumber));
        } else if (res.status === 404) {
          Toast.show("Invalid OTP", Toast.LONG, Toast.BOTTOM, phoneNumberError);
        } else if (res.status === 500) {
          Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, phoneNumberError);
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    let { code } = this.state;
    let { params } = this.props.navigation.state;
    return (
      <View style={[SignUpStyles.signUpPageActivity]}>
        <View style={centerAlignment.contentAlignInCenter}>
          <View>
            <Text style={css.headerText2}>OTP has been sent to your mobile number please enter it below.</Text>
          </View>
          <View style={{ height: 80 }}>
            <OtpInputs inputStyles={css.otp} handleChange={code => this.setState({ code })} numberOfInputs={4} />
          </View>
          <View style={{ margin: 10 }}>
            <Text style={css.helpText}>Resend code?</Text>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={css.helpText}>Haven't received the code?</Text>
          </View>
        </View>
        <ButtonGradient
          clickHandler={() => this.compareOTP(params, code)}
          title="Verify"
          color1={Colors.commonButtonGradient1}
          color2={Colors.commonButtonGradient2}
          buttonStyle={SignUpStyles.signUpButton}
          buttonTextStyle={LoginStyles.loginButtonText}
        />
      </View>
    );
  }
}

const phoneNumberError = {
  width: 300,
  yOffset: 60,
  height: 120,
  backgroundColor: "#545454",
  color: "#FFFFFF",
  fontSize: 17
};

const css = StyleSheet.create({
  header: {
    margin: 15
  },
  otp: { fontFamily: Fonts.Fonts.CA_bold, fontSize: 20, color: Colors.commonButtonGradient2 },
  headerText2: { fontFamily: Fonts.Fonts.CA_book, fontSize: 17, textAlign: "center" },
  headerText: { textAlign: "center" },
  helpText: { fontFamily: Fonts.Fonts.CA_book, fontSize: 15, textAlign: "center" }
});

export default EnterVerificationCode;
