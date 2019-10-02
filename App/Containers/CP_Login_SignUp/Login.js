import React from "react";
import { Text, View, Image } from "react-native";
import colors from "../../Themes/Colors";
import images from "../../Themes/Images";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { TextField } from "react-native-material-textfield";
import { LoginStyles } from "./Styles/Login-Styles";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";

class Login extends React.Component {
  static navigationOptions = {
    title: "Sign In",
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerBackImage: images.back,
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      color: colors.gradientViolet
    },
    headerLeft: <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
  };
  constructor(props) {
    super(props);
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.state = {
      cca2: "AI",
      phNumber: "",
      countryDetails: "",
      numberWithoutPrefix: "",
      isValid: "",
      getPhoneNumber: "",
      getFlag: "",
      applyFocus: "",
      teamName: "",
      dialCode: "",
      phone: "",
      password: "",
      clubId: ""
    };
  }
  onPhoneChange(e) {
    this.setState({
      phNumber: e,
      isValid: this.phone.isValidNumber(),
      getPhoneNumber: this.phone.getValue(),
      dialCode: this.phone.getDialCode()
    });
  }
  onPressFlag() {
    this.countryPicker.openModal();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2, countryDetails: country });
  }
  render() {
    let { password, clubId } = this.state;
    return (
      <View style={LoginStyles.loginActivity}>
        <Text style={LoginStyles.header}>Club Passport</Text>

        <View style={LoginStyles.signInContent}>
          <View style={LoginStyles.inputPhoneNumber}>
            {/** Input Phone Number */}

            <View style={LoginStyles.transparent}>
              <PhoneInput
                ref={ref => {
                  this.phone = ref;
                }}
                onChangePhoneNumber={this.onPhoneChange}
                onPressFlag={this.onPressFlag}
                initialCountry="in"
                value={this.state.phNumber}
                onFocus={this.state.applyFocus}
                textStyle={{ paddingLeft: 40 }}
              />
              <Text style={{ position: "absolute", left: 40 }}>
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
          <TextField
            label="Password*"
            value={password}
            tintColor="#000"
            onChangeText={password => this.setState({ password })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
          <TextField
            label="Club ID*"
            value={clubId}
            tintColor="#000"
            onChangeText={clubId => this.setState({ clubId })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
          <View>
            <Text style={LoginStyles.forgotPassword}>Forgot Password ?</Text>
          </View>
          <ButtonGradient
            title="Sign In"
            color1={colors.commonButtonGradient1}
            color2={colors.commonButtonGradient2}
            buttonStyle={LoginStyles.loginButton}
            buttonTextStyle={LoginStyles.loginButtonText}
          />
          <View style={LoginStyles.signUpText}>
            <Text>Dont't Have an account?</Text>
            <Text style={LoginStyles.signUp}> Sign Up</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default Login;
