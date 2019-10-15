import React from "react";
import { Text, View, Image, StyleSheet, Dimensions, BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";
import image from "../../Themes/Images";
import Styles from "./Styles/CorrectAnswer-Style";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/ClubData";
import { QuestionAnswerStyle } from "./Styles/QuestionAnswer-Style";

const navigateToQuestionAnswerPage = NavigationActions.navigate({
  routeName: "QuestionAnswer",
  action: NavigationActions.navigate({ routeName: "QuestionAnswer" })
});

const navigateScoreScreen = NavigationActions.navigate({
  routeName: "ScoreScreen",
  action: NavigationActions.navigate({ routeName: "ScoreScreen" })
});

class WrongAnswer extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = {
    countDown: 5
  };

  timer = () => {
    let { totalQuestions } = this.props.selectedGame;
    this.setState({
      countDown: this.state.countDown - 1
    });

    if (this.state.countDown < 0) {
      let index = this.props.questionIndex;
      let updatedIndex = index + 1;
      if (updatedIndex > totalQuestions - 1) {
        this.props.getIndexOfQuestion(0);
        this.props.addScore(0);
        this.props.navigation.dispatch(navigateScoreScreen);
        clearInterval(this.intervalId);
      } else if (updatedIndex <= totalQuestions - 1) {
        this.props.getIndexOfQuestion(updatedIndex);
        this.props.navigation.dispatch(navigateToQuestionAnswerPage);
        clearInterval(this.intervalId);
      }
    }
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      BackHandler.exitApp();
      return true;
    });
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }
  componentWillUnmount() {
    this.backHandler.remove();
    clearInterval(this.intervalId);
  }
  render() {
    console.log("score of player", this.props.scoreOfPlayer);
    let index = this.props.questionIndex;
    let mobileIcon = { marginRight: "20%" };
    let tabletIcon = { marginRight: "10%" };
    let marginForIcon = Math.round(Dimensions.get("window").width) > 550 ? tabletIcon : mobileIcon;
    return (
      <View style={Styles.container}>
        <Image source={image.wrongCircle} style={marginForIcon} />
        <Text style={Styles.textBelowLogo}>Oops</Text>
        <Text style={Styles.suggestion}>Sorry better luck next time.</Text>
        <View style={Styles.answerSection}>
          <View style={Styles.correctAnswer}>
            <Text style={Styles.correctAnswerText}>Correct Ans is:</Text>
            <Text style={Styles.correctAnswerSubText}>{this.props.correctAnswer}</Text>
          </View>
        </View>
        <View style={QuestionAnswerStyle.coinAlignmentVideoScreen}>
          <View>
            <Image source={image.dollar} style={QuestionAnswerStyle.coin} />
          </View>
          <View style={QuestionAnswerStyle.score}>
            <Text>+{this.props.questions.result[index].score}</Text>
          </View>
        </View>
        <Text style={Styles.totalPoints}>Your Total Points: {this.props.scoreOfPlayer}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getIndexOfQuestion: index => dispatch(actions.indexOfQuestion(index))
  };
};

const mapStateToProps = state => {
  return {
    questionIndex: state.ClubReducer.indexOfQuestion,
    selectedGame: state.ClubReducer.selectedGame,
    questions: state.ClubReducer.questions,
    correctAnswer: state.ClubReducer.correctAnswer,
    scoreOfPlayer: state.ClubReducer.scoreOfPlayer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrongAnswer);
