import React from "react";
import { Text, View, Image, TouchableNativeFeedback } from "react-native";
import { NavigationActions } from "react-navigation";
import colors from "../../Themes/Colors";
import images from "../../Themes/Images";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { TextField } from "react-native-material-textfield";
import { LoginStyles } from "./Styles/Login-Styles";
import { login } from "../../Services/API";
import Toast from "react-native-toast-native";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/ClubData";

const navigateToDashboardPage = NavigationActions.navigate({
  routeName: "DashboardPage",
  action: NavigationActions.navigate({ routeName: "DashboardPage" })
});

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

  APILogin = (phoneNumber, password, clubId) => {
    login(phoneNumber, password, clubId)
      .then(res => {
        if (res.error === 0) {
          this.props.userLoginDetails(res.result[0]);
          this.props.navigation.dispatch(navigateToDashboardPage);
        } else if (res.error === 1) {
          if (res.result[0].message === "Invalid Club") {
            Toast.show(res.result[0].message, Toast.LONG, Toast.BOTTOM, invalidClub);
          }
          Toast.show(res.result[0].message, Toast.LONG, Toast.BOTTOM, errorToast);
        }
      })
      .catch(err => {
        Toast.show("Something went wrong...", Toast.LONG, Toast.BOTTOM, invalidClub);
      });
  };

  selectCountry(country) {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2, countryDetails: country });
  }
  render() {
    let { getPhoneNumber, password, clubId } = this.state;
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
          <TouchableNativeFeedback>
            <Text style={LoginStyles.forgotPassword}>Forgot Password ?</Text>
          </TouchableNativeFeedback>
          <ButtonGradient
            title="Sign In"
            clickHandler={() => this.APILogin(getPhoneNumber, password, clubId.toUpperCase())}
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

const errorToast = {
  width: 300,
  yOffset: 60,
  height: 280,
  backgroundColor: "#545454",
  color: "#FFFFFF",
  fontSize: 17
};

const invalidClub = {
  width: 300,
  yOffset: 60,
  height: 120,
  backgroundColor: "#545454",
  color: "#FFFFFF",
  fontSize: 17
};

const mapDispatchToProps = dispatch => {
  return {
    userLoginDetails: data => dispatch(actions.getUserData(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
