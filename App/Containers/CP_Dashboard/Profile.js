import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
// import images from "../../Themes/Images";
import Images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import { ProfileStyle } from "./Styles/Profile-Style";
import { getLeaderBoardForLoggedInUser, getLeaderBoardForGameIdOfLoggedInUser } from "../../Services/API";
import { ScrollView } from "react-native-gesture-handler";
import { LeaderBoardStyle } from "./Styles/LeaderBoard-Style";
import { randomColorGenerator } from "../../Components/Utils/RandomColorGenerator";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { widthPercentageToDP } from "../../Components/Utils/PercentageToPixels";
import Fonts from "../../Themes/Fonts";
import CardView from "react-native-cardview";

const navigateToLeaderBoardPage = NavigationActions.navigate({
  routeName: "LeaderBoard",
  action: NavigationActions.navigate({ routeName: "LeaderBoard" })
});

const navigateBackToDashboard = NavigationActions.navigate({
  routeName: "DashboardPage",
  action: NavigationActions.navigate({ routeName: "DashboardPage" })
});

const UpdateProfile = NavigationActions.navigate({
  routeName: "UpdateProfile",
  action: NavigationActions.navigate({ routeName: "UpdateProfile" })
});

const SettingPage = NavigationActions.navigate({
  routeName: "Settings",
  action: NavigationActions.navigate({ routeName: "Settings" })
});

class ProfilePage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile",
      headerStyle: {
        backgroundColor: "#fff"
      },
      // headerBackImage: images.back,
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        color: Colors.gradientViolet
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.dispatch(navigateBackToDashboard)}>
          <Image source={Images.back} style={{ height: 24, width: 15, marginLeft: 20 }} resizeMode="cover" />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={() => navigation.dispatch(SettingPage)}>
          <Image source={Images.setting} style={{ height: 24, width: 25, marginRight: 20 }} resizeMode="cover" />
        </TouchableOpacity>
      )
    };
  };

  state = {};

  componentDidMount() {
    let { playerId, clubId } = this.props.userLoginData;
    getLeaderBoardForLoggedInUser(clubId, playerId)
      .then(res => {
        console.log("getLeaderBoardForLoggedInUser res", res);
        if (res.status === 200) {
          this.props.getLeaderBoardForLoggedUser(res.data);
        } else if (res.status === 404) {
          // Toast.show(res.data.message, Toast.LONG, Toast.BOTTOM, invalidClub);
        } else if (res.status === 500) {
          // Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, errorToast);
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  getLeaderBoardForGameIdOfLoggedInUser = (clubId, gameId) => {
    getLeaderBoardForGameIdOfLoggedInUser(clubId, gameId).then(res => {
      if (res.status === 200) {
        this.props.storeLeaderboardData(res.data);
        this.props.navigation.dispatch(navigateToLeaderBoardPage);
      } else if (res.status === 404) {
        // Toast.show(res.data.message, Toast.LONG, Toast.BOTTOM, invalidClub);
      } else if (res.status === 500) {
        // Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, errorToast);
      }
    });
  };

  render() {
    console.log("userLoginData", this.props.userLoginData);
    let { playerName, clubId, profilePic } = this.props.userLoginData;
    let { clubName, clubLogo } = this.props.clubData;

    return (
      <View style={ProfileStyle.profileActivity}>
        <View style={ProfileStyle.basicProfileInfo}>
          <View style={[ProfileStyle.col6, { paddingLeft: 5 }]}>
            <View style={{ paddingLeft: 10 }}>
              <Text style={ProfileStyle.userName}>{playerName}</Text>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={ProfileStyle.clubId}>{clubId}</Text>
            </View>
            <View style={{ paddingLeft: 10 }}>
              <Text style={ProfileStyle.changeClub}>Change Club</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[ProfileStyle.col6, { position: "relative" }]}
            onPress={() => this.props.navigation.dispatch(UpdateProfile)}
          >
            <View style={ProfileStyle.userImage}>
              {profilePic ? (
                <Image source={{ uri: profilePic }} style={ProfileStyle.userImagePic} />
              ) : (
                <Image source={Images.ic_passport} style={ProfileStyle.userImagePic} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={ProfileStyle.basicProfileInfo}>
          <View style={ProfileStyle.clubNameBox}>
            <View style={ProfileStyle.clubNameText}>
              <Text style={ProfileStyle.clubName}>{clubName}</Text>
            </View>
            <View style={ProfileStyle.clubLogoImage}>
              <Image source={{ uri: clubLogo }} style={ProfileStyle.clubLogo} />
            </View>
          </View>

          <View style={ProfileStyle.totalScoreSection}>
            <View style={[ProfileStyle.row]}>
              <View style={{ width: "70%" }}>
                <Text style={ProfileStyle.violetBoxText}>Total Score</Text>
              </View>
              <View style={[ProfileStyle.row, { width: "30%" }]}>
                <View style={ProfileStyle.dollarImageAlignment}>
                  <Image source={Images.coins} style={ProfileStyle.dollarImage} />
                </View>
                <View>
                  <Text style={ProfileStyle.violetBoxText}>{this.props.leaderBoardForLoggedUser.finalScore}</Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={ProfileStyle.leaderBoardButton}
                onPress={() => this.props.navigation.dispatch(navigateToLeaderBoardPage)}
              >
                <Text style={ProfileStyle.leaderBoard}>LEADERBOARD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={ProfileStyle.scoreBoard}>Score Board</Text>
        </View>
        <ScrollView contentContainerStyle={{ marginTop: 10 }}>
          {!!this.props.leaderBoardForLoggedUser &&
            this.props.leaderBoardForLoggedUser.result.map((k, i) => (
              // <CardView cardElevation={5} cardMaxElevation={5} cornerRadius={5} key={i}>
              <View key={i} style={ProfileStyle.card}>
                <View style={ProfileStyle.leaderBoardGameName_Color}>
                  <View style={[LeaderBoardStyle.randomColor, { backgroundColor: randomColorGenerator() }]}></View>
                  <View style={ProfileStyle.leaderBoardGameNameAlignment}>
                    <View style={ProfileStyle.w_100}>
                      <Text numberOfLines={1} style={LeaderBoardStyle.playerNameText}>
                        {k.gameName}
                      </Text>
                    </View>
                    <View style={ProfileStyle.leaderBoardBUttonAlignment}>
                      <ButtonGradient
                        title="LEADERBOARD"
                        clickHandler={() => this.getLeaderBoardForGameIdOfLoggedInUser(clubId, k.gameId)}
                        color1={Colors.commonButtonGradient1}
                        color2={Colors.commonButtonGradient2}
                        buttonStyle={ProfileStyle.leaderBoardCardScrollViewButton}
                        buttonTextStyle={ProfileStyle.leaderBoardCardScrollView}
                      />
                    </View>
                  </View>
                </View>
                {/* <View style={ProfileStyle.leaderBoardBookAlignment}></View> */}
                <View style={ProfileStyle.leaderBoardCoinsAlignment}>
                  <View style={LeaderBoardStyle.userScore}>
                    <View style={LeaderBoardStyle.coinAlignment}>
                      <Image source={Images.coins} style={LeaderBoardStyle.coins} />
                    </View>
                    <View style={LeaderBoardStyle.scoreAlignment}>
                      <Text style={LeaderBoardStyle.score}>+{k.score}</Text>
                    </View>
                  </View>
                </View>
              </View>
              // </CardView>
            ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData,
    gameData: state.ClubReducer.gameData,
    clubData: state.ClubReducer.clubData,
    leaderBoardForLoggedUser: state.ClubReducer.leaderBoardForLoggedUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLeaderBoardForLoggedUser: data => dispatch(actions.getLeaderBoardForLoggedUser(data)),
    storeLeaderboardData: data => dispatch(actions.getLeaderBoard(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePage);
