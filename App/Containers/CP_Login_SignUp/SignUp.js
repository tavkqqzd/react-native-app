import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity, Switch, ScrollView } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { centerAlignment } from "../../Themes/ActivityStyles";
import { SignUpStyles } from "./Styles/SingUp-Styles";
import { validateClubID } from "../../Services/API";
import Toast from "react-native-toast-native";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { connect } from "react-redux";
import { TextField } from "react-native-material-textfield";
import { LoginStyles } from "./Styles/Login-Styles";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";

class SignUp extends React.Component {
  static navigationOptions = {
    title: "Sign Up",
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
    name: "",
    optionalName: "",
    email: "",
    password: "",
    clubMemberId: "",
    employee: false,
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
    clubId: "",
    switchButton: false,
    radioBtn: false
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

  selectCountry = country => {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2, countryDetails: country });
  };

  switchToggler = () => {
    this.setState({ switchButton: !this.state.switchButton });
  };

  onSelect = (index, value) => {
    this.setState({
      radioBtn: !this.state.radioBtn
    });
  };

  render() {
    const { clubLogo } = this.props.clubData;
    const { name, email, optionalName, password, clubMemberId, switchButton, radioBtn } = this.state;
    return (
      <ScrollView style={SignUpStyles.signUpPageActivity}>
        <View style={centerAlignment.contentAlignInCenter}>
          <Image source={{ uri: clubLogo }} style={{ width: 120, height: 120 }} />
        </View>
        <View>
          <TextField
            label="Name*"
            value={name}
            tintColor="#000"
            onChangeText={name => this.setState({ name })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
          <TextField
            label="User Name(Optional)"
            value={optionalName}
            tintColor="#000"
            onChangeText={optionalName => this.setState({ optionalName })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
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
            label="Email Address*"
            value={email}
            tintColor="#000"
            onChangeText={email => this.setState({ email })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
          <TextField
            label="Password*"
            value={password}
            tintColor="#000"
            onChangeText={password => this.setState({ password })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
          <TextField
            label="Club Membership ID(Optional)"
            value={clubMemberId}
            tintColor="#000"
            onChangeText={clubMemberId => this.setState({ clubMemberId })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
          <View style={[LoginStyles.MatUI_Text_Field, SignUpStyles.isEmployee]}>
            <View style={{ position: "absolute", bottom: 15 }}>
              <Text>Employee</Text>
            </View>
            <View style={{ marginBottom: 10 }}>
              <Switch value={switchButton} onValueChange={this.switchToggler} />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <RadioGroup onSelect={(index, value) => this.onSelect(index, value)}>
              <RadioButton value={radioBtn}></RadioButton>
            </RadioGroup>
            <View>
              <Text>By Clicking Sing Up, I agree to Terms of Service and Privacy Policy</Text>
            </View>
          </View>
          <ButtonGradient
            title="Sign Up"
            color1={Colors.commonButtonGradient1}
            color2={Colors.commonButtonGradient2}
            buttonStyle={SignUpStyles.signUpButton}
            buttonTextStyle={LoginStyles.loginButtonText}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    clubData: state.ClubReducer.clubData
  };
};

export default connect(
  mapStateToProps,
  null
)(SignUp);
