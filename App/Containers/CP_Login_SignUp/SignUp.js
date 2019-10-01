import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { centerAlignment } from "../../Themes/ActivityStyles";
import { SignUpStyles } from "./Styles/SingUp-Styles";
import LinearGradient from "react-native-linear-gradient";
import metrics from "../../Themes/Metrics";

class SignUp extends React.Component {
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
    clubId: ""
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
        <TouchableOpacity>
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

export default SignUp;
