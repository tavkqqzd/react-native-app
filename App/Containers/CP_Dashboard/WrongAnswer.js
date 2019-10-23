import React from "react";
import { Text, View, Image, StyleSheet, Dimensions, BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";
import image from "../../Themes/Images";
import Styles from "./Styles/CorrectAnswer-Style";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/ClubData";
import { QuestionAnswerStyle } from "./Styles/QuestionAnswer-Style";
import Colors from "../../Themes/Colors";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { widthPercentageToDP } from "../../Components/Utils/PercentageToPixels";

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
    let index = this.props.questionIndex;
    let updatedIndex = index + 1;
    if (updatedIndex > totalQuestions - 1) {
      this.props.getIndexOfQuestion(0);
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
    let mobileIcon = { marginRight: "20%" };
    let tabletIcon = { marginRight: "10%" };
    let marginForIcon = Math.round(Dimensions.get("window").width) > 550 ? tabletIcon : mobileIcon;
    return (
      <View style={Styles.container}>
        {this.props.questions &&
        this.props.questions.result[index].mediaType === 0 &&
        this.props.questions.result[index].image ? (
          <Image
            source={{ uri: this.props.questions && this.props.questions.result[index].image }}
            style={{ width: 300, height: 300 }}
          />
        ) : (
          <Image source={image.wrongCircle} style={marginForIcon} />
        )}

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
    correctAnswer: state.ClubReducer.correctAnswer,
    scoreOfPlayer: state.ClubReducer.scoreOfPlayer
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrongAnswer);
