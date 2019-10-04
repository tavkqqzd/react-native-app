import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { centerAlignment } from "../../Themes/ActivityStyles";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { compareOTP } from "../../Services/API";
import Toast from "react-native-toast-native";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { connect } from "react-redux";
import { LoginStyles } from "../CP_Login_SignUp/Styles/Login-Styles";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import OtpInputs from "react-native-otp-inputs";

const navigateToSignUpPage = NavigationActions.navigate({
  routeName: "SignUp",
  action: NavigationActions.navigate({ routeName: "SignUp" })
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
        console.log("res from compare", res);
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
            <Text>OTP has been sent to your mobile number please enter it below.</Text>
          </View>
          <View style={{ height: 80 }}>
            <OtpInputs handleChange={code => this.setState({ code })} numberOfInputs={4} />
          </View>
          <View style={{ margin: 10 }}>
            <Text>Resend code?</Text>
          </View>
          <View style={{ margin: 10 }}>
            <Text>Haven't received the code?</Text>
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

const css = StyleSheet.create({
  header: {
    margin: 15
  },
  headerText: { textAlign: "center" }
});

export default EnterVerificationCode;
