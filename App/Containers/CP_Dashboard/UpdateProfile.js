import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions, Button, ScrollView } from "react-native";
import PhoneInput from "react-native-phone-input";
import CountryPicker from "react-native-country-picker-modal";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";
import { centerAlignment } from "../../Themes/ActivityStyles";
import * as actions from "../../Store/Actions/ClubData";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { editProfile } from "../../Services/API";
import { TextField } from "react-native-material-textfield";
import { widthPercentageToDP, heightPercentageToDP } from "../../Components/Utils/PercentageToPixels";
import { InstructionStyle } from "./Styles/Instruction-Style";
import { LoginStyles } from "../CP_Login_SignUp/Styles/Login-Styles";
import { QuestionAnswerStyle } from "./Styles/QuestionAnswer-Style";

const ProfilePage = NavigationActions.navigate({
  routeName: "Profile",
  action: NavigationActions.navigate({ routeName: "Profile" })
});

class UpdateProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Edit Profile",
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerBackImage: images.back,
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: Colors.gradientViolet
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.dispatch(ProfilePage)}>
          <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
        </TouchableOpacity>
      )
    };
  };
  state = {
    profileImage: "",
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
    fileData: "",
    EmployeeId: ""
  };
  selectCountry = country => {
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2, countryDetails: country });
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
  };
  uploadImage = () => {
    ImagePicker.launchImageLibrary(options, response => {
      let id = this.props.clubData.clubId;
      let newName = id.concat(`-${this.state.name}`);
      let file = this.file(response, newName);
      RNS3.put(file, options).then(response => {
        if (response.status !== 201) throw new Error("Failed to upload image to S3");
        this.props.profileImageS3UploadLocation(response.body.postResponse.location);
      });
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      }
    });
  };

  editProfile = () => {
    let callingCode = this.state.countryDetails.callingCode ? "+".concat(this.state.countryDetails.callingCode) : "+91";
    let PhoneNumber = this.state.phNumber ? this.state.phNumber : this.props.phoneNumber;
    let clubMembershipId = this.state.clubMemberId ? this.state.clubMemberId : 0;
    let profileImage = this.props.S3UploadUrl ? this.props.S3UploadUrl : this.props.userLoginData.profilePic;
    let playerName = this.state.name ? this.state.name : this.props.userLoginData.playerName;
    let emailId = this.state.email ? this.state.email : "demo@demo.com";
    let username = this.state.optionalName ? this.state.optionalName : this.props.userLoginData.userName;
    let obj = [
      {
        playerId: this.props.userLoginData.playerId,
        playerName: playerName,
        emailId: emailId,
        username: username,
        profileImage: profileImage,
        employeeTypeCode: this.props.userLoginData.employeeTypeCode,
        clubMembershipId: clubMembershipId,
        phoneNumberCode: callingCode,
        phoneNumber: PhoneNumber
      }
    ];

    editProfile(obj)
      .then(res => {
        if (res.status === 200) {
          console.log("update profile successfully");
          this.props.navigation.dispatch(ProfilePage);
        } else if (res.status === 404) {
          console.log("404");
        } else if (res.status === 500) {
          console.log("500");
        }
      })
      .catch(err => {
        console.log("catch err", err);
      });
  };

  render() {
    console.log("phoneNumber", this.props.phoneNumber);
    const { name, email, optionalName, password, clubMemberId, radioBtn } = this.state;
    let { playerName, clubId, profilePic } = this.props.userLoginData;
    return (
      <View style={SignUpStyles.signUpPageActivity}>
        <TouchableOpacity style={centerAlignment.contentAlignInCenter} onPress={() => this.uploadImage()}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={profilePic} />
          ) : (
            <Image source={images.ic_passport} style={css.profilePic} />
          )}
        </TouchableOpacity>

        <View style={{ position: "relative" }}>
          <TextField
            labelTextStyle={LoginStyles.MAT_UI_LabelStyles}
            titleTextStyle={LoginStyles.MAT_UI_LabelStyles}
            label="Name*"
            value={this.props.userLoginData.playerName}
            tintColor="#000"
            onChangeText={name => this.setState({ name })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
          <TextField
            labelTextStyle={LoginStyles.MAT_UI_LabelStyles}
            titleTextStyle={LoginStyles.MAT_UI_LabelStyles}
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
            label="Email Address*"
            value={email}
            tintColor="#000"
            onChangeText={email => this.setState({ email })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
          <TextField
            labelTextStyle={LoginStyles.MAT_UI_LabelStyles}
            titleTextStyle={LoginStyles.MAT_UI_LabelStyles}
            label="Club Membership ID(Optional)"
            value={clubMemberId}
            tintColor="#000"
            onChangeText={clubMemberId => this.setState({ clubMemberId })}
            inputContainerStyle={LoginStyles.MatUI_Text_Field}
          />
        </View>
        <Button onPress={() => this.editProfile()} title="Save" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData,
    gameData: state.ClubReducer.gameData,
    clubData: state.ClubReducer.clubData,
    selectedGame: state.ClubReducer.selectedGame,
    phoneNumber: state.ClubReducer.phoneNumber,
    S3UploadUrl: state.ClubReducer.S3UploadUrl
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeGameData: data => dispatch(actions.storeGameData(data)),
    getQuestions: data => dispatch(actions.getQuestions(data)),
    profileImageS3UploadLocation: data => dispatch(actions.profileImageS3UploadLocation(data))
  };
};

const css = StyleSheet.create({
  profilePic: {
    borderRadius: 50,
    height: 120,
    width: 120
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);