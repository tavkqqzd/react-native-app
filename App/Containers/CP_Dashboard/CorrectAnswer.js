import React from "react";
import { Text, View, Image, Dimensions, BackHandler } from "react-native";
import Styles from "./Styles/CorrectAnswer-Style";
import { NavigationActions } from "react-navigation";
import image from "../../Themes/Images";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/ClubData";
import { QuestionAnswerStyle } from "./Styles/QuestionAnswer-Style";

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
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getIndexOfQuestion: index => dispatch(actions.indexOfQuestion(index)),
    addScore: score => dispatch(actions.scoreOfPlayer(score))
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
