import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";

import DashboardCard from "../../Components/Card/DashboardCard";
import { ScrollView } from "react-native-gesture-handler";
import { widthPercentageToDP } from "../../Components/Utils/PercentageToPixels";

// const navigateToProfilePage = NavigationActions.navigate({
//   routeName: "Profile",
//   action: NavigationActions.navigate({ routeName: "Profile" })
// });

class ProfilePage extends React.Component {
  static navigationOptions = {
    title: "Profile",
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerBackImage: images.back,
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      color: Colors.gradientViolet
    },
    headerLeft: <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />,
    headerRight: (
      <TouchableOpacity>
        <Image source={images.setting} style={{ height: 24, width: 25, marginRight: 20 }} resizeMode="cover" />
      </TouchableOpacity>
    )
  };

  // onPress={() => this.props.navigation.dispatch(navigateToProfilePage)}
  state = {};

  componentDidMount() {}

  render() {
    let { playerName, clubId } = this.props.userLoginData;
    return (
      <View style={css.profileActivity}>
        <View style={css.basicProfileInfo}>
          <View style={css.col6}>
            <View>
              <Text>{playerName}</Text>
            </View>
            <View>
              <Text>{clubId}</Text>
            </View>
            <View>
              <Text>Change Club</Text>
            </View>
          </View>
          <View style={[css.col6]}>
            <Image source={images.ic_passport} style={{ width: 80, height: 80 }} />
          </View>
        </View>
        <ScrollView></ScrollView>
      </View>
    );
  }
}

const css = StyleSheet.create({
  profileActivity: { margin: 10 },
  basicProfileInfo: { flexDirection: "row" },
  col6: {
    width: widthPercentageToDP("50%")
  },
  headerText: { textAlign: "center" },
  profileImage: { alignItems: "flex-end", marginRight: 20 }
});

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData,
    gameData: state.ClubReducer.gameData
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     storeGameData: data => dispatch(actions.storeGameData(data))
//   };
// };

export default connect(
  mapStateToProps,
  null
)(ProfilePage);
