import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";

const navigateToProfilePage = NavigationActions.navigate({
  routeName: "Profile",
  action: NavigationActions.navigate({ routeName: "Profile" })
});

// const navigatePrivacyPolicy = NavigationActions.navigate({
//   routeName: "PrivacyPolicy",
//   action: NavigationActions.navigate({ routeName: "PrivacyPolicy" })
// });

const navigateToTermsAndService = NavigationActions.navigate({
  routeName: "TermsAndService",
  action: NavigationActions.navigate({ routeName: "TermsAndService" })
});

const navigateToAboutUs = NavigationActions.navigate({
  routeName: "AboutUs",
  action: NavigationActions.navigate({ routeName: "AboutUs" })
});

class Settings extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Settings",
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
        <TouchableOpacity onPress={() => navigation.dispatch(navigateToProfilePage)}>
          <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
        </TouchableOpacity>
      ),
      headerRight: <View />
    };
  };

  render() {
    return (
      <View style={{ margin: 20 }}>
        <View style={{ marginTop: 10 }}>
          {/* <TouchableOpacity onPress={() => this.props.navigation.dispatch(navigatePrivacyPolicy)}>
            <Text style={{ fontFamily: Fonts.Fonts.CA_book, fontSize: 16, paddingBottom: 15 }}>Privacy Policy</Text>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(navigateToTermsAndService)}>
            <Text style={{ fontFamily: Fonts.Fonts.CA_book, fontSize: 16, paddingBottom: 15 }}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(navigateToAboutUs)}>
            <Text style={{ fontFamily: Fonts.Fonts.CA_book, fontSize: 16 }}>About Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Settings;
