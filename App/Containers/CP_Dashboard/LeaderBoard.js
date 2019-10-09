import { getLeaderBoard } from "../../Services/API";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import { LeaderBoardStyle } from "./Styles/LeaderBoard-Style";

import DashboardCard from "../../Components/Card/DashboardCard";
import { ScrollView } from "react-native-gesture-handler";
import { widthPercentageToDP } from "../../Components/Utils/PercentageToPixels";
import { randomColorGenerator } from "../../Components/Utils/RandomColorGenerator";

const navigateBackToProfile = NavigationActions.navigate({
  routeName: "Profile",
  action: NavigationActions.navigate({ routeName: "Profile" })
});

class LeaderBoard extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "LeaderBoard",
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
        <TouchableOpacity onPress={() => navigation.dispatch(navigateBackToProfile)}>
          <Image source={images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
        </TouchableOpacity>
      ),
      headerRight: <View />
    };
  };

  state = {};

  componentDidMount() {
    let { clubId } = this.props.userLoginData;
    getLeaderBoard(clubId)
      .then(res => {
        if (res.status === 200) {
          this.props.storeLeaderboardData(res.data);
        } else if (res.status === 404) {
          Toast.show("No Leaderboard Found", Toast.LONG, Toast.BOTTOM, invalidClub);
        } else if (res.status === 500) {
          Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, errorToast);
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  render() {
    return (
      <View>
        <ScrollView contentContainerStyle={{ margin: 4 }}>
          {!!this.props.leaderBoard &&
            this.props.leaderBoard.result.map((k, i) => (
              <View key={i} style={LeaderBoardStyle.row}>
                <View style={LeaderBoardStyle.userName}>
                  <View style={[LeaderBoardStyle.randomColor, { backgroundColor: randomColorGenerator() }]}></View>
                  <View style={LeaderBoardStyle.playerName}>
                    <Text style={LeaderBoardStyle.playerNameText}>{k.playerName}</Text>
                  </View>
                </View>
                <View style={LeaderBoardStyle.userScore}>
                  <Text>{k.score}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData,
    leaderBoard: state.ClubReducer.leaderBoard
  };
};

const mapDispatchToProps = dispatch => {
  return {
    storeLeaderboardData: data => dispatch(actions.getLeaderBoard(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoard);
