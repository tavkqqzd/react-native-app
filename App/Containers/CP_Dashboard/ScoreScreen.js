import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { getQuestions } from "../../Services/API";
import { widthPercentageToDP, heightPercentageToDP } from "../../Components/Utils/PercentageToPixels";
import { InstructionStyle } from "./Styles/Instruction-Style";

const QuestionAnswerPage = NavigationActions.navigate({
  routeName: "QuestionAnswer",
  action: NavigationActions.navigate({ routeName: "QuestionAnswer" })
});

class ScoreScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = {};

  render() {
    return (
      <View style={InstructionStyle.instructionIntent}>
        <Text>Game Completed</Text>
      </View>
    );
  }
}

const css = StyleSheet.create({
  buttonTextStyle: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: "bold"
  },
  startButton: {
    height: 50,
    width: widthPercentageToDP("80%"),
    borderRadius: 30
  }
});

export default connect(
  null,
  null
)(ScoreScreen);
