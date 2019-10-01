import React from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import { centerAlignment } from "../../Themes/ActivityStyles";
import { SignUpStyles } from "./Styles/SingUp-Styles";
import { validateClubID } from "../../Services/API";
import Toast from "react-native-toast-native";

const navigateToSignUpPage = NavigationActions.navigate({
  routeName: "SignUp",
  action: NavigationActions.navigate({ routeName: "SignUp" })
});

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
    clubId: ""
  };

  render() {
    return (
      <View style={[centerAlignment.contentAlignInCenter, SignUpStyles.signUpPageActivity]}>
        <Text>Sign Up</Text>
      </View>
    );
  }
}

export default SignUp;
