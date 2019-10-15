import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity, Switch, ScrollView, Button } from "react-native";
import ImagePicker from "react-native-image-picker";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { centerAlignment } from "../../Themes/ActivityStyles";
import { SignUpStyles } from "./Styles/SingUp-Styles";
import { getEmployeeType, signUp } from "../../Services/API";
import Toast from "react-native-toast-native";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { connect } from "react-redux";
import { TextField } from "react-native-material-textfield";
import { LoginStyles } from "./Styles/Login-Styles";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { Dropdown } from "react-native-material-dropdown";
import * as actions from "../../Store/Actions/ClubData";

import { RNS3 } from "react-native-s3-upload";

// const options = {
//   title: "Select Avatar",
//   customButtons: [{ name: "fb", title: "Choose Photo from Facebook" }],
//   storageOptions: {
//     skipBackup: true,
//     path: "images"
//   }
// };

AWS_ACCESSKEY_ID = "AKIAJZ5F3ACPRUYRU2AQ";
AWS_SECRET_ACCESS_KEY = "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";
AWS_S3_BUCKET_NAME = "cpatrivia";
AWS_S3_REGION = "us-east-1";

const options = {
  keyPrefix: "players/",
  bucket: "cpatrivia",
  region: "us-east-1",
  accessKey: "AKIAJZ5F3ACPRUYRU2AQ",
  secretKey: "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",
  successActionStatus: 201
};

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
    list: "",
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
    radioBtn: false,
    imageCaptured: "",
    fileData: ""
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

  file = (response, name) => {
    return {
      uri: response.uri,
      name: name,
      type: response.type
    };
    // `uri` can also be a file system path (i.e. file://)
  };

  selectCountry = country => {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2, countryDetails: country });
  };

  // switchToggler = () => {
  //   this.setState({ switchButton: !this.state.switchButton });
  // };

  onSelect = (index, value) => {
    this.setState({
      radioBtn: !this.state.radioBtn
    });
  };

  createNewArrayToRender = arr => {
    let arrayToPush = [];
    let object = {};
    arr.map(
      k => (
        (object = {}),
        (object["id"] = k.id),
        (object["value"] = k.employeeType),
        (object["seqId"] = k.seqId),
        arrayToPush.push(object)
      )
    );
    return arrayToPush;
  };

  componentDidMount() {
    let { params } = this.props.navigation.state;
    getEmployeeType(params).then(res => {
      if (res.status === 200) {
        let arr = this.createNewArrayToRender(res.data.result);

        this.props.setListOfEmployeeTypes(arr);
        this.setState({ list: arr });
      } else if (res.status === 404) {
        // Toast.show(res.data.message, Toast.LONG, Toast.BOTTOM, invalidClub);
      } else if (res.status === 500) {
        // Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, errorToast);
      }
    });
  }
  //
  signUp = () => {
    let callingCode = this.state.countryDetails.callingCode ? "+".concat(this.state.countryDetails.callingCode) : "+91";
    let memId = this.state.clubMemberId.length > 0 ? this.state.clubMemberId : 0;
    let optionalName = this.state.optionalName.length > 0 ? this.state.optionalName : "User";
    let empCode = this.getIdOfEmployee() ? this.getIdOfEmployee() : 0;
    let { clubId } = this.props.clubData;
    let { name, email, password, fileData } = this.state;
    RNS3.put(fileData, options).then(response => {
      if (response.status !== 201) throw new Error("Failed to upload image to S3");
      console.log("uploaded", response.body);
    });
    signUp(name, email, optionalName, password, clubId, memId, callingCode, this.state.phNumber, empCode)
      .then(res => {
        console.log("sign up successfull", res);
      })
      .catch(err => {
        console.log("sign up failed", err);
      });
  };

  uploadImage = () => {
    ImagePicker.launchImageLibrary(options, response => {
      let id = this.props.clubData.clubId;
      let newName = id.concat(`-${this.state.name}`);
      let file = this.file(response, newName);
      this.setState({ fileData: file });

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      }
    });
  };

  getIdOfEmployee = () => {
    let el = this.props.listOfEmployeeTypes.filter(k => k.value === this.props.employeeType);
    console.log("getIdOfEmployee", el);
    return el.id;
  };

  render() {
    const { clubLogo } = this.props.clubData;
    const { name, email, optionalName, password, clubMemberId, switchButton, radioBtn } = this.state;
    return (
      <ScrollView style={SignUpStyles.signUpPageActivity}>
        <View style={centerAlignment.contentAlignInCenter}>
          <Image source={{ uri: clubLogo }} style={{ width: 120, height: 120 }} />
        </View>

        <View style={{ position: "relative" }}>
          <TouchableOpacity style={{ position: "absolute", right: 10, top: -30 }} onPress={() => this.uploadImage()}>
            <Image source={images.ic_camera} style={{ width: 70, height: 60 }} />
          </TouchableOpacity>

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

          {this.props.listOfEmployeeTypes && this.props.listOfEmployeeTypes.length > 0 ? (
            <View>
              <Dropdown
                label="Employee Type"
                data={this.props && this.props.listOfEmployeeTypes}
                onChangeText={(v, i) => this.props.setEmployeeType(v)}
              />
            </View>
          ) : (
            <View />
          )}

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <RadioGroup onSelect={(index, value) => this.onSelect(index, value)}>
              <RadioButton value={radioBtn}></RadioButton>
            </RadioGroup>
            <View>
              <Text>By Clicking Sign Up, I agree to Terms of Service and Privacy Policy</Text>
            </View>
          </View>
          <ButtonGradient
            clickHandler={() => this.signUp()}
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
    clubData: state.ClubReducer.clubData,
    listOfEmployeeTypes: state.ClubReducer.listOfEmployeeTypes,
    employeeType: state.ClubReducer.employeeType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEmployeeType: data => dispatch(actions.setEmployeeType(data)),
    setListOfEmployeeTypes: data => dispatch(actions.listOfEmployeeTypes(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
