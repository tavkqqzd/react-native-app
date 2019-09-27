import React from "react";
import { View, Image, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import colors from "../../Themes/Colors";
import image from "../../Themes/Images";
import * as ActivityStyles from "../../Themes/ActivityStyles";
import { NavigationActions } from "react-navigation";

const navigateToLoginPage = NavigationActions.navigate({
  routeName: "CP_Login_SignUp",
  action: NavigationActions.navigate({ routeName: "CP_Login_SignUp" })
});

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.dispatch(navigateToLoginPage);
    }, 3000);
  }
  render() {
    return (
      <LinearGradient
        useAngle={true}
        angle={90}
        colors={[colors.gradientBlue, colors.gradientViolet]}
        style={ActivityStyles.coverCompleteActivity.globalPage}
      >
        <View style={ActivityStyles.centerAlignment.centerAlignment}>
          <Image source={image.whiteLogo} />
        </View>
      </LinearGradient>
    );
  }
}

export default App;
