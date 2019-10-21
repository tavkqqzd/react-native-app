import React from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { centerAlignment } from "../../Themes/ActivityStyles";
import { SignUpStyles } from "./Styles/SingUp-Styles";
import { validateClubID } from "../../Services/API";
import Toast from "react-native-toast-native";
import * as actions from "../../Store/Actions/ClubData";
import { connect } from "react-redux";
import Fonts from "../../Themes/Fonts";
import { ScrollView } from "react-native-gesture-handler";

const navigateToSignUpPage = cid =>
  NavigationActions.navigate({
    routeName: "SignUp",
    action: NavigationActions.navigate({ routeName: "SignUp" }),
    params: cid
  });

const NavigateTo_CP_Login_SignUpPage = NavigationActions.navigate({
  routeName: "CP_Login_SignUp",
  action: NavigationActions.navigate({ routeName: "CP_Login_SignUp" })
});

class EnterClubId extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Club ID",
      headerStyle: {
        backgroundColor: "#fff"
      },
      headerBackImage: images.back,
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontFamily: Fonts.Fonts.CA_bold,
        color: Colors.gradientViolet
      },
      headerLeft: (
        <TouchableNativeFeedback onPress={() => navigation.dispatch(NavigateTo_CP_Login_SignUpPage)}>
          <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
        </TouchableNativeFeedback>
      )
    };
  };
  state = {
    clubId: ""
  };

  validateClubID = clubId => {
    validateClubID(clubId)
      .then(res => {
        console.log("validateClubId", res);
        if (res.status === 200) {
          this.props.getClubData(res.data.result[0]);
          this.props.navigation.dispatch(navigateToSignUpPage(this.state.clubId));
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

  ConvertTextToUpperCase = e => {
    var A = e;

    var B = A.toUpperCase();

    this.setState({ clubId: B });
  };

  render() {
    let iconRender = "";
    if (this.state.clubId.length > 4) {
      iconRender = (
        <TouchableOpacity onPress={() => this.validateClubID(this.state.clubId)}>
          <Image source={images.blueEnter} />
        </TouchableOpacity>
      );
    } else {
      iconRender = (
        <TouchableWithoutFeedback>
          <Image source={images.blackEnter} />
        </TouchableWithoutFeedback>
      );
    }
    return (
      <ScrollView contentContainerStyle={[centerAlignment.contentAlignInCenter, SignUpStyles.signUpPageActivity]}>
        <View>
          <Image source={images.blueLogo} alt="Club Passport" />
        </View>
        <View style={SignUpStyles.clubIdInput}>
          <Text style={SignUpStyles.enterClubId}>Enter Club ID</Text>
        </View>
        <View style={SignUpStyles.inputContainer}>
          <TextInput
            autoCapitalize="characters"
            style={SignUpStyles.inputBox}
            value={this.state.clubId}
            onChangeText={this.ConvertTextToUpperCase}
          />
          <View style={SignUpStyles.submitButton}>{iconRender}</View>
        </View>
      </ScrollView>
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
