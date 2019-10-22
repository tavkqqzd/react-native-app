import React from "react";
import { Text, View, Image, TouchableNativeFeedback, ToastAndroid } from "react-native";
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
import Fonts from "../../Themes/Fonts";

const navigateToDashboardPage = NavigationActions.navigate({
  routeName: "DashboardPage",
  action: NavigationActions.navigate({ routeName: "DashboardPage" })
});

const NavigateTo_CP_Login_SignUpPage = NavigationActions.navigate({
  routeName: "CP_Login_SignUp",
  action: NavigationActions.navigate({ routeName: "CP_Login_SignUp" })
});

const navigateToSignUpPage = NavigationActions.navigate({
  routeName: "EnterClubId",
  action: NavigationActions.navigate({ routeName: "EnterClubId" })
});

const navigateToHelpWithPasswordPage = number =>
  NavigationActions.navigate({
    routeName: "HelpWithPassword",
    action: NavigationActions.navigate({ routeName: "HelpWithPassword" }),
    params: number
  });

class Login extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Sign In",
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerBackImage: images.back,
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontSize: 17,
        fontFamily: Fonts.Fonts.CA_bold,
        color: colors.gradientViolet
      },

      headerLeft: (
        <TouchableNativeFeedback onPress={() => navigation.dispatch(NavigateTo_CP_Login_SignUpPage)}>
          <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
        </TouchableNativeFeedback>
      )
    };
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
    if (this.state.phNumber.length > 2 && this.state.password.length > 2 && this.state.clubId.length > 2) {
      this.props.getPhoneNumber(this.state.phNumber);
      login(phoneNumber, password, clubId)
        .then(res => {
          if (res.status === 200) {
            this.props.userLoginDetails(res.data.result[0]);
            this.props.navigation.dispatch(navigateToDashboardPage);
          } else if (res.status === 404) {
            ToastAndroid.show(res.data.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, invalidClub);
          } else if (res.status === 500) {
            ToastAndroid.show("Server Error", ToastAndroid.LONG, ToastAndroid.BOTTOM, invalidClub);
          }
        })
        .catch(err => {
          console.log("err", err);
          ToastAndroid.show("Something went wrong", ToastAndroid.LONG, ToastAndroid.BOTTOM, invalidClub);
        });
    }
  };

  checkIfNumberIsValid = number => {
    if (number.length > 5) {
      return this.props.navigation.dispatch(navigateToHelpWithPasswordPage(this.state.phNumber));
    } else {
      ToastAndroid.show("Please check your number..", ToastAndroid.LONG, ToastAndroid.BOTTOM, invalidClub);
    }
  };

  clubId = e => {
    this.setState({ clubId: e });
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
          <TextField
            labelTextStyle={LoginStyles.MAT_UI_LabelStyles}
            titleTextStyle={LoginStyles.MAT_UI_LabelStyles}
            label="Password*"
            value={password}
            tintColor="#000"
            onChangeText={password => this.setState({ password })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
          <TextField
            labelTextStyle={LoginStyles.MAT_UI_LabelStyles}
            titleTextStyle={LoginStyles.MAT_UI_LabelStyles}
            label="Club ID*"
            value={clubId}
            tintColor="#000"
            onChangeText={this.clubId}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
          <TouchableNativeFeedback onPress={() => this.checkIfNumberIsValid(this.state.phNumber)}>
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
            <Text style={LoginStyles.dontHaveAccount}>Dont't Have an account?</Text>
            <TouchableNativeFeedback onPress={() => this.props.navigation.dispatch(navigateToSignUpPage)}>
              <Text style={LoginStyles.signUp}> Sign Up</Text>
            </TouchableNativeFeedback>
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

const phoneNumberError = {
  width: 300,
  yOffset: 60,
  height: 120,
  backgroundColor: "#545454",
  color: "#FFFFFF",
  fontSize: 17
};

const mapDispatchToProps = dispatch => {
  return {
    userLoginDetails: data => dispatch(actions.getUserData(data)),
    getPhoneNumber: data => dispatch(actions.getPhoneNumber(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
