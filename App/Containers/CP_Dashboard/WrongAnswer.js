import React from "react";
import { Text, View, Image, StyleSheet, Dimensions, BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";
import image from "../../Themes/Images";
import Styles from "./Styles/CorrectAnswer-Style";

const navigateToQuestionAnswerPage = index =>
  NavigationActions.navigate({
    routeName: "QuestionAnswer",
    action: NavigationActions.navigate({ routeName: "QuestionAnswer" }),
    params: index
  });

class WrongAnswer extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = {
    countDown: 5
  };

  timer = () => {
    let index = this.props.navigation.state.params;
    let updatedIndex = index + 1;
    this.setState({
      countDown: this.state.countDown - 1
    });
    if (this.state.countDown < 0) {
      this.props.navigation.dispatch(navigateToQuestionAnswerPage(updatedIndex));
      clearInterval(this.intervalId);
    }
  };

  componentDidMount() {
    console.log("wrong answer params", this.props.navigation.state.params);
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
            <Text style={Styles.correctAnswerSubText}>Correct Answer</Text>
          </View>
        </View>
        <View style={[Styles.score, { marginBottom: 8, marginTop: 8 }]}>
          <View style={Styles.coin}>{/* <svg.dollar width="20" height="20" /> */}</View>
          <Text>0</Text>
        </View>
        <Text style={Styles.totalPoints}>Your Total Points: XX Score</Text>
      </View>
    );
  }
}

export default WrongAnswer;
