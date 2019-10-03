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

const enterVerificationCode = NavigationActions.navigate({
  routeName: "EnterVerificationCode",
  action: NavigationActions.navigate({ routeName: "EnterVerificationCode" })
});

class DashboardPage extends React.Component {
  static navigationOptions = {
    title: "Club Passport",
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerBackImage: images.back,
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      color: Colors.gradientViolet
    },
    headerLeft: <View />,
    headerRight: (
      <TouchableOpacity>
        <Image source={images.user} style={{ height: 24, width: 15, marginRight: 20 }} resizeMode="cover" />
      </TouchableOpacity>
    )
  };
  state = {};

  componentDidMount() {
    let y = new Date().getFullYear();
    let m = new Date().getMonth();
    let d = new Date().getDay();
    let arr = [].concat(y, m, d);
    let newArr = arr.join("-");
    let { playerId, clubId, userFlag } = this.props.userLoginData;
    getGameAndUserDetail(playerId, clubId, userFlag, newArr, 0, 0)
      .then(res => {
        this.props.storeGameData(res.result[0]);
        console.log("res", res);
      })
      .catch(err => {
        console.log(err, err);
      });
  }

  render() {
    let { gameData } = this.props;
    return (
      <ScrollView>
        <View style={{ padding: 10 }}>
          {!!gameData &&
            gameData.games &&
            gameData.games.map(k => (
              <View key={k.gameName}>
                <DashboardCard gameName={k.gameName} totalQuestions={k.totalQuestions} />
              </View>
            ))}
        </View>
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

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData,
    gameData: state.ClubReducer.gameData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeGameData: data => dispatch(actions.storeGameData(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
