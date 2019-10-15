import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { generateOTP } from "../../Services/API";
import Toast from "react-native-toast-native";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { connect } from "react-redux";
import { LoginStyles } from "../CP_Login_SignUp/Styles/Login-Styles";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import Fonts from "../../Themes/Fonts";

const enterVerificationCode = number =>
  NavigationActions.navigate({
    routeName: "EnterVerificationCode",
    action: NavigationActions.navigate({ routeName: "EnterVerificationCode" }),
    params: number
  });

class HelpWithPassword extends React.Component {
  static navigationOptions = {
    title: "Help With Password",
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
    cca2: "AI",
    phNumber: "",
    countryDetails: "",
    numberWithoutPrefix: "",
    isValid: "",
    getPhoneNumber: "",
    getFlag: "",
    applyFocus: ""
  };
  onPhoneChange = e => {
    this.setState({
      phNumber: e,
      isValid: this.phone.isValidNumber(),
      getPhoneNumber: this.phone.getValue(),
      dialCode: this.phone.getDialCode()
    });
  };
  onPressFlag = () => {
    this.countryPicker.openModal();
  };

  generateOTP = mobileNumberWithPrefix => {
    let num = `${this.phone.getDialCode()}` + mobileNumberWithPrefix;
    generateOTP(num)
      .then(res => {
        if (res.status === 200) {
          Toast.show("OTP Sent Successfully", Toast.LONG, Toast.BOTTOM, phoneNumberError);
          this.props.navigation.dispatch(enterVerificationCode(num));
        } else if (res.status === 404) {
          Toast.show(res.data.message, Toast.LONG, Toast.BOTTOM, phoneNumberError);
        } else if (res.status === 500) {
          Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, phoneNumberError);
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  selectCountry = country => {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2, countryDetails: country });
  };

  render() {
    let { params } = this.props.navigation.state;
    let number = this.state.phNumber ? this.state.phNumber : params;
    return (
      <View style={SignUpStyles.signUpPageActivity}>
        <View style={css.header}>
          <Text style={css.headerText}>
            Enter your mobile number and you will get verification code to reset password.
          </Text>
        </View>
        <View style={[LoginStyles.inputPhoneNumber, SignUpStyles.countryPicker]}>
          {/** Input Phone Number */}
          <View style={LoginStyles.transparent}>
            <PhoneInput
              ref={ref => {
                this.phone = ref;
              }}
              onChangePhoneNumber={this.onPhoneChange}
              onPressFlag={this.onPressFlag}
              initialCountry="in"
              value={this.state.phNumber || params}
              onFocus={this.state.applyFocus}
              textStyle={{ paddingLeft: 40, fontSize: 17, fontFamily: Fonts.Fonts.CA_book }}
            />
            <Text style={{ position: "absolute", left: 40, fontSize: 17, fontFamily: Fonts.Fonts.CA_book }}>
              {this.state.countryDetails.callingCode ? "+".concat(this.state.countryDetails.callingCode) : "+91"}
            </Text>
          </View>

          <CountryPicker
            ref={ref => {
              this.countryPicker = ref;
            }}
            filterable={true}
            filterPlaceholder="Search Country"
            onChange={value => this.selectCountry(value)}
            translation="eng"
            cca2={this.state.cca2}
          >
            <View />
          </CountryPicker>
        </View>
        <ButtonGradient
          // clickHandler={() => this.props.navigation.dispatch(enterVerificationCode)}
          clickHandler={() => this.generateOTP(number)}
          title="Next"
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
  headerText: { textAlign: "center", fontSize: 17, fontFamily: Fonts.Fonts.CA_book }
});

export default HelpWithPassword;
