import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { centerAlignment } from "../../Themes/ActivityStyles";
import { SignUpStyles } from "./Styles/SingUp-Styles";
import { validateClubID } from "../../Services/API";
import Toast from "react-native-toast-native";
import * as actions from "../../Store/Actions/ClubData";
import { connect } from "react-redux";

const navigateToSignUpPage = NavigationActions.navigate({
  routeName: "SignUp",
  action: NavigationActions.navigate({ routeName: "SignUp" })
});

class EnterClubId extends React.Component {
  static navigationOptions = {
    title: "ClubID",
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
    clubId: "CLUENV001"
  };

  validateClubID = clubId => {
    validateClubID(clubId)
      .then(res => {
        if (res.status === 200) {
          this.props.getClubData(res.data.result[0]);
          this.props.navigation.dispatch(navigateToSignUpPage);
        } else if (res.status === 404) {
          Toast.show("Enter Valid Club ID", Toast.LONG, Toast.BOTTOM, errorToast);
        } else if (res.status === 400) {
          Toast.show("Bad Request", Toast.LONG, Toast.BOTTOM, errorToast);
        } else if (res.status === 500) {
          Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, errorToast);
        }
      })
      .catch(err => {
        Toast.show("Something went wrong...", Toast.LONG, Toast.BOTTOM, errorToast);
      });
  };

  render() {
    let iconRender = "";
    if (!this.state.clubId.length > 0) {
      iconRender = (
        <TouchableOpacity>
          <Image source={images.blackEnter} />
        </TouchableOpacity>
      );
    } else {
      iconRender = (
        <TouchableOpacity onPress={() => this.validateClubID(this.state.clubId)}>
          <Image source={images.blueEnter} />
        </TouchableOpacity>
      );
    }
    return (
      <View style={[centerAlignment.contentAlignInCenter, SignUpStyles.signUpPageActivity]}>
        <View>
          <Image source={images.blueLogo} alt="Club Passport" />
        </View>
        <View style={SignUpStyles.clubIdInput}>
          <Text style={SignUpStyles.enterClubId}>Enter Club ID</Text>
        </View>
        <View style={SignUpStyles.inputContainer}>
          <TextInput style={SignUpStyles.inputBox} onChangeText={clubId => this.setState({ clubId })} />
          <View style={SignUpStyles.submitButton}>{iconRender}</View>
        </View>
      </View>
    );
  }
}

const errorToast = {
  width: 300,
  yOffset: 60,
  height: 120,
  backgroundColor: "#545454",
  color: "#FFFFFF",
  fontSize: 17
};

const mapDispatchToProps = dispatch => {
  return {
    getClubData: data => dispatch(actions.getClubData(data))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EnterClubId);
