import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { getGameAndUserDetail, validateClubID } from "../../Services/API";

import DashboardCard from "../../Components/Card/DashboardCard";
import { ScrollView } from "react-native-gesture-handler";

const navigateToProfilePage = NavigationActions.navigate({
  routeName: "Profile",
  action: NavigationActions.navigate({ routeName: "Profile" })
});

const navigateToInstructionsPage = NavigationActions.navigate({
  routeName: "Instructions",
  action: NavigationActions.navigate({ routeName: "Instructions" })
});

class DashboardPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
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
        <TouchableOpacity onPress={() => navigation.dispatch(navigateToProfilePage)}>
          <Image source={images.user} style={{ height: 24, width: 15, marginRight: 20 }} resizeMode="cover" />
        </TouchableOpacity>
      )
    };
  };
  state = {
    cardsData: ""
  };

  componentDidMount() {
    let y = new Date().getFullYear();
    let m = new Date().getMonth();
    let d = new Date().getDay();
    let arr = [].concat(y, m, d);
    let newArr = arr.join("-");
    let { clubId, playerId, employeeTypeCode } = this.props.userLoginData;
    getGameAndUserDetail(employeeTypeCode, clubId, 0, 10, playerId)
      .then(res => {
        console.log("res.data", res.data);
        if (res.status === 200) {
          this.props.storeGameData(res.data);
        } else if (res.status === 404) {
          // Toast.show(res.data.message, Toast.LONG, Toast.BOTTOM, invalidClub);
        } else if (res.status === 500) {
          // Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, errorToast);
        }
      })
      .catch(err => {
        console.log(err, err);
      });
    validateClubID(clubId)
      .then(res => {
        if (res.status === 200) {
          this.props.getClubData(res.data.result[0]);
        }
      })
      .catch(err => console.log(err));
  }

  selectedGame = data => {
    this.props.selectedGame(data);
    this.props.navigation.dispatch(navigateToInstructionsPage);
  };

  render() {
    let { gameData } = this.props;
    return (
      <ScrollView>
        <View style={{ padding: 10 }}>
          {!!gameData &&
            gameData.result &&
            gameData.result.map(k => (
              <View key={k.name}>
                <DashboardCard
                  gameData={k}
                  gameName={k.name}
                  totalQuestions={k.totalQuestions}
                  onClickHandler={() => this.selectedGame(k)}
                />
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
    storeGameData: data => dispatch(actions.storeGameData(data)),
    getClubData: data => dispatch(actions.getClubData(data)),
    selectedGame: data => dispatch(actions.selectedGame(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
