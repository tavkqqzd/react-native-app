import React from "react";
import { Text, View, Image, Dimensions, BackHandler } from "react-native";
import Styles from "./Styles/CorrectAnswer-Style";
import { NavigationActions } from "react-navigation";
import image from "../../Themes/Images";

// updated data
const navigateToQuestionAnswerPage = NavigationActions.navigate({
  routeName: "QuestionAnswer",
  action: NavigationActions.navigate({ routeName: "QuestionAnswer" })
  // params: this.props.navigation.state.params + 1
});

class CorrectAnswerPage extends React.Component {
  // static navigationOptions = ({ navigation }) => ({ header: null });
  state = {
    countDown: 5
  };

  timer = () => {
    this.setState({
      countDown: this.state.countDown - 1
    });
    if (this.state.countDown < 0) {
      this.props.navigation.dispatch(navigateToQuestionAnswerPage);
      clearInterval(this.intervalId);
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
    let mobileIcon = { marginRight: "14%" };
    let tabletIcon = { marginRight: "7%" };
    let marginForIcon = Math.round(Dimensions.get("window").width) > 550 ? tabletIcon : mobileIcon;
    return (
      <View style={Styles.container}>
        <Image source={image.correctCircleWithStars} style={marginForIcon} />
        <Text style={Styles.textBelowLogo}>Awesome</Text>
        <Text style={Styles.suggestion}>Congrats</Text>
        <View style={[Styles.score, { marginBottom: 8, marginTop: 8 }]}>
          <View style={Styles.coin}>{/* <svg.dollar width="20" height="20" /> */}</View>
          <Text>X Points</Text>
        </View>
        <Text style={Styles.totalPoints}>Your Total Points: Total Points</Text>
      </View>
    );
  }
}

export default CorrectAnswerPage;
