import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, ToastAndroid } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { centerAlignment } from "../../Themes/ActivityStyles";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { compareOTP, signUp } from "../../Services/API";
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

const NavigateToLoginPage = NavigationActions.navigate({
  routeName: "Login",
  action: NavigationActions.navigate({ routeName: "Login" })
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

  componentDidMount() {
    console.log("EnterVerificationCode props", this.props.navigation.state.params);
  }

  generateOTP = () => {
    generateOTP(this.props.navigation.state.params)
      .then(res => {
        if (res.status === 200) {
          ToastAndroid.show("OTP Sent Successfully", ToastAndroid.LONG, ToastAndroid.BOTTOM, phoneNumberError);
        } else if (res.status === 404) {
          ToastAndroid.show(res.data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, phoneNumberError);
        } else if (res.status === 500) {
          ToastAndroid.show("Server Error", ToastAndroid.LONG, ToastAndroid.BOTTOM, phoneNumberError);
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  compareOTP = (phNumber, OTPCode) => {
    let {
      s3Url,
      employeeId,
      SIGNUP,
      name,
      email,
      optionalName,
      clubId,
      memId,
      password,
      callingCode,
      phoneNumberWithoutPrefix
    } = this.props.navigation.state.params;
    compareOTP(phNumber, OTPCode)
      .then(res => {
        if (res.status === 200) {
          if (SIGNUP === true) {
            signUp(
              name,
              email,
              optionalName,
              password,
              clubId,
              memId,
              callingCode,
              phoneNumberWithoutPrefix,
              s3Url,
              employeeId
            )
              .then(res => {
                ToastAndroid.show("Sign Up Successfull", ToastAndroid.LONG, ToastAndroid.BOTTOM, phoneNumberError);
                this.props.navigation.dispatch(NavigateToLoginPage);
              })
              .catch(err => {
                ToastAndroid.show("Sign Up Failed", ToastAndroid.LONG, ToastAndroid.BOTTOM, phoneNumberError);
              });
          } else {
            this.props.navigation.dispatch(navigateToMobileNumberVerified(phNumber));
          }
        } else if (res.status === 404) {
          ToastAndroid.show("Invalid OTP", ToastAndroid.LONG, ToastAndroid.BOTTOM, phoneNumberError);
        } else if (res.status === 500) {
          ToastAndroid.show("Server Error", ToastAndroid.LONG, ToastAndroid.BOTTOM, phoneNumberError);
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    let { code } = this.state;
    let { params } = this.props.navigation.state;
    let { completeNumber, SIGNUP } = this.props.navigation.state.params;
    return (
      <View style={[SignUpStyles.signUpPageActivity]}>
        <View style={centerAlignment.contentAlignInCenter}>
          <View>
            <Text style={css.headerText2}>OTP has been sent to your mobile number please enter it below.</Text>
          </View>
          <View style={{ height: 80 }}>
            <OtpInputs inputStyles={css.otp} handleChange={code => this.setState({ code })} numberOfInputs={4} />
          </View>
          <TouchableOpacity style={{ margin: 10 }} onPress={() => this.generateOTP()}>
            <Text style={css.helpText}>Resend code?</Text>
          </TouchableOpacity>
          <View style={{ margin: 10 }}>
            <Text style={css.helpText}>Haven't received the code?</Text>
          </View>
        </View>
        <ButtonGradient
          clickHandler={
            SIGNUP === true ? () => this.compareOTP(completeNumber, code) : () => this.compareOTP(params, code)
          }
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
