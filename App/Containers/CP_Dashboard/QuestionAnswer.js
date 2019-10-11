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

class QuestionAnswer extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = {};

  render() {
    let { remainingQuestions, totalQuestions } = this.props.selectedGame;
    let questionIndex = "";
    if (remainingQuestions === totalQuestions) {
      questionIndex = 0;
    }
    console.log(this.props.questions);
    return (
      <View>
        <View>
          <Text>{this.props.questions.result[questionIndex].question}</Text>
        </View>
        {!!this.props.questions &&
          this.props.questions.result[questionIndex].options.map((k, i) => (
            <View key={i}>
              <Text>{k}</Text>
            </View>
          ))}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.ClubReducer.questions,
    selectedGame: state.ClubReducer.selectedGame
  };
};

export default connect(
  mapStateToProps,
  null
)(QuestionAnswer);
