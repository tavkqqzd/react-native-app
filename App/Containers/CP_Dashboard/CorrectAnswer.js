import React from "react";
import { Text, View, Image, Dimensions, BackHandler } from "react-native";
import Styles from "./Styles/CorrectAnswer-Style";
import { NavigationActions } from "react-navigation";
import image from "../../Themes/Images";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/ClubData";
import { QuestionAnswerStyle } from "./Styles/QuestionAnswer-Style";
import Colors from "../../Themes/Colors";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";

// updated data
const navigateToQuestionAnswerPage = NavigationActions.navigate({
  routeName: "QuestionAnswer",
  action: NavigationActions.navigate({ routeName: "QuestionAnswer" })
});

const navigateScoreScreen = NavigationActions.navigate({
  routeName: "ScoreScreen",
  action: NavigationActions.navigate({ routeName: "ScoreScreen" })
});

class CorrectAnswerPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = {
    countDown: 5
  };

  timer = () => {
    let { totalQuestions } = this.props.selectedGame;
    let index = this.props.questionIndex;
    let updatedIndex = index + 1;
    if (updatedIndex > totalQuestions - 1) {
      this.props.getIndexOfQuestion(0);
      this.props.resetScore();
      this.props.navigation.dispatch(navigateScoreScreen);
      // clearInterval(this.intervalId);
    } else if (updatedIndex <= totalQuestions - 1) {
      this.props.getIndexOfQuestion(updatedIndex);
      this.props.navigation.dispatch(navigateToQuestionAnswerPage);
      // clearInterval(this.intervalId);
    }
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    let index = this.props.questionIndex;
    let mobileIcon = { marginRight: "14%" };
    let tabletIcon = { marginRight: "7%" };
    let marginForIcon = Math.round(Dimensions.get("window").width) > 550 ? tabletIcon : mobileIcon;
    return (
      <View style={Styles.container}>
        <Image source={image.correctCircleWithStars} style={marginForIcon} />
        <Text style={Styles.textBelowLogo}>Awesome</Text>
        <Text style={Styles.suggestion}>Congrats</Text>
        <View style={QuestionAnswerStyle.coinAlignmentVideoScreen}>
          <View>
            <Image source={image.dollar} style={QuestionAnswerStyle.coin} />
          </View>
          <View style={QuestionAnswerStyle.score}>
            <Text>+{this.props.questions.result[index].score}</Text>
          </View>
        </View>
        <Text style={Styles.totalPoints}>Your Total Points: {this.props.scoreOfPlayer}</Text>
        <ButtonGradient
          title="Next"
          clickHandler={() => this.timer()}
          color1={Colors.commonButtonGradient1}
          color2={Colors.commonButtonGradient2}
          buttonStyle={QuestionAnswerStyle.nextWrongCorrectButton}
          buttonTextStyle={QuestionAnswerStyle.exitButtonText}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getIndexOfQuestion: index => dispatch(actions.indexOfQuestion(index)),
    resetScore: () => dispatch(actions.resetScore())
  };
};

const mapStateToProps = state => {
  return {
    questionIndex: state.ClubReducer.indexOfQuestion,
    selectedGame: state.ClubReducer.selectedGame,
    questions: state.ClubReducer.questions,
    scoreOfPlayer: state.ClubReducer.scoreOfPlayer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorrectAnswerPage);
