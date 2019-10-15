import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { NavigationActions } from "react-navigation";
import LinearGradient from "react-native-linear-gradient";
import * as ActivityStyles from "../../Themes/ActivityStyles";
import { QuestionAnswerStyle } from "./Styles/QuestionAnswer-Style";
import { ScoreStyles } from "./Styles/ScoreScreen-Style";

const NavigateToDashboard = NavigationActions.navigate({
  routeName: "DashboardPage",
  action: NavigationActions.navigate({ routeName: "DashboardPage" })
});

class ScoreScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = {};

  render() {
    let { playerName } = this.props.userLoginData;
    let { clubName } = this.props.clubData;
    let { name } = this.props.selectedGame;
    return (
      <View style={ActivityStyles.coverCompleteActivity.globalPage}>
        <LinearGradient
          useAngle={true}
          angle={90}
          colors={[Colors.gradientBlue, Colors.gradientViolet]}
          style={ScoreStyles.ScoreScreenActivity}
        >
          <View style={ScoreStyles.AlignCenter}>
            <Text style={ScoreStyles.GameName}>{name}</Text>
            <View>
              <Image source={Images.ic_passport} style={ScoreStyles.UserImage} />
            </View>
          </View>
        </LinearGradient>

        <View style={ScoreStyles.Player_ClubInfo}>
          <View style={ScoreStyles.PlayerNameAlignment}>
            <Text style={ScoreStyles.PlayerNameText}>{playerName}</Text>
          </View>
          <View style={ScoreStyles.PlayerNameAlignment}>
            <Text style={ScoreStyles.ClubNameText}>{clubName}</Text>
          </View>
        </View>
        <View style={ScoreStyles.WhiteScreen}>
          <View>
            <Text style={ScoreStyles.PointsEarnedText}>Points Earned</Text>
          </View>
          <View style={[QuestionAnswerStyle.coinAlignment, ScoreStyles.coins]}>
            <View>
              <Image source={Images.dollar} style={QuestionAnswerStyle.coin} />
            </View>
            <View style={QuestionAnswerStyle.score}>
              <Text style={{ fontFamily: Fonts.Fonts.CA_book }}>+5</Text>
            </View>
          </View>
          <ButtonGradient
            title="Leaderboard"
            color1={Colors.commonButtonGradient1}
            color2={Colors.commonButtonGradient2}
            buttonStyle={ScoreStyles.LeaderBoard}
            buttonTextStyle={ScoreStyles.LeaderBoardButtonText}
          />
          <TouchableOpacity
            style={ScoreStyles.MoreGames}
            onPress={() => this.props.navigation.dispatch(NavigateToDashboard)}
          >
            <Text style={ScoreStyles.LeaderBoardButtonText}>More games</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData,
    gameData: state.ClubReducer.gameData,
    clubData: state.ClubReducer.clubData,
    selectedGame: state.ClubReducer.selectedGame
  };
};

const css = StyleSheet.create({});

export default connect(
  mapStateToProps,
  null
)(ScoreScreen);
