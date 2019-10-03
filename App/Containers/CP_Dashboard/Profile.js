import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { getGameAndUserDetail } from "../../Services/API";

import DashboardCard from "../../Components/Card/DashboardCard";
import { ScrollView } from "react-native-gesture-handler";

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
    return (
      <ScrollView>
        <Text>Profile Page</Text>
        {/* <View style={{ padding: 10 }}>
          {!!gameData &&
            gameData.games &&
            gameData.games.map(k => (
              <View key={k.gameName}>
                <DashboardCard gameName={k.gameName} totalQuestions={k.totalQuestions} />
              </View>
            ))}
        </View> */}
      </ScrollView>
    );
  }
}

const css = StyleSheet.create({
  header: {
    margin: 15
  },
  headerText: { textAlign: "center" }
});

// const mapStateToProps = state => {
//   return {
//     userLoginData: state.ClubReducer.userData,
//     gameData: state.ClubReducer.gameData
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     storeGameData: data => dispatch(actions.storeGameData(data))
//   };
// };

export default connect(
  null,
  null
)(ProfilePage);
