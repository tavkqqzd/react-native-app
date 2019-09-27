import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import colors from "../../Themes/Colors";
import images from "../../Themes/Images";
import metrics from "../../Themes/Metrics";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { TextField } from "react-native-material-textfield";

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
      <View style={css.loginActivity}>
        <Text>Club Passport</Text>
        <View>
          {/** Input Phone Number */}
          <View>
            <PhoneInput
              ref={ref => {
                this.phone = ref;
              }}
              onChangePhoneNumber={this.onPhoneChange}
              onPressFlag={this.onPressFlag}
              initialCountry="in"
              value={this.state.phNumber}
              onFocus={this.state.applyFocus}
            />
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
        <TextField label="Password*" value={password} onChangeText={password => this.setState({ password })} />
        <TextField label="Club ID*" value={clubId} onChangeText={clubId => this.setState({ clubId })} />
      </View>
    );
  }
}

const css = StyleSheet.create({
  loginActivity: {
    margin: metrics.section
  }
});

export default Login;
