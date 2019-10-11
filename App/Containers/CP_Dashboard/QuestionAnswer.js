import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import * as actions from "../../Store/Actions/ClubData";
import ButtonGradient from "../../Components/Buttons/ButtonGradient";
import { SignUpStyles } from "../CP_Login_SignUp/Styles/SingUp-Styles";
import { getQuestions, sumbitAnswer } from "../../Services/API";
import { widthPercentageToDP, heightPercentageToDP } from "../../Components/Utils/PercentageToPixels";
import { InstructionStyle } from "./Styles/Instruction-Style";
import { QuestionAnswerStyle } from "./Styles/QuestionAnswer-Style";
import ProgressCircle from "react-native-progress-circle";

const QuestionAnswerPage = NavigationActions.navigate({
  routeName: "QuestionAnswer",
  action: NavigationActions.navigate({ routeName: "QuestionAnswer" })
});

class QuestionAnswer extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = { selectedOption: "" };

  submitAnswer = (id, question, qId, selectedAnswer) => {
    let obj = [
      {
        gameId: id,
        question: question,
        queId: qId,
        playerId: this.props.userData.playerId,
        selectedAnswer: selectedAnswer
      }
    ];
    if (this.props.questions.result[questionIndex].correctAnswer === this.state.selectedOption) {
      sumbitAnswer(obj)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            console.log("submitted answer");
          } else if (res.status === 404) {
            console.log("404");
          } else if (res.status === 500) {
            console.log("500");
          }
        })
        .catch(err => {
          console.log("catch err", err);
        });
    } else {
      sumbitAnswer(obj)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            console.log("submitted answer");
          } else if (res.status === 404) {
            console.log("404");
          } else if (res.status === 500) {
            console.log("500");
          }
        })
        .catch(err => {
          console.log("catch err", err);
        });
    }
  };

  selectedOptionFn = ans => {
    this.setState({ selectedOption: ans });
  };

  render() {
    let { remainingQuestions, totalQuestions, id } = this.props.selectedGame;
    let questionIndex = "";
    if (remainingQuestions === totalQuestions) {
      questionIndex = 0;
    }
    return (
      <View>
        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", margin: 20 }}>
          <ButtonGradient
            title="Exit"
            // clickHandler={() => this.getQuestions(id)}
            color1={Colors.commonButtonGradient1}
            color2={Colors.commonButtonGradient2}
            buttonStyle={QuestionAnswerStyle.exitButton}
            buttonTextStyle={QuestionAnswerStyle.exitButtonText}
          />
        </View>
        <View style={InstructionStyle.instructionIntent}>
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <ProgressCircle percent={30} radius={40} borderWidth={2} color="#1CACF4" shadowColor="#999" bgColor="#fff">
              <Text style={{ fontSize: 18 }}>{"30%"}</Text>
            </ProgressCircle>
          </View>
          <View style={QuestionAnswerStyle.coinAlignment}>
            <View>
              <Image source={images.dollar} style={QuestionAnswerStyle.coin} />
            </View>
            <View style={QuestionAnswerStyle.score}>
              <Text>+5</Text>
            </View>
          </View>
          <View>
            <Text style={QuestionAnswerStyle.question}>{this.props.questions.result[questionIndex].question}</Text>
          </View>
          {!!this.props.questions &&
            this.props.questions.result[questionIndex].options.map((k, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => this.selectedOptionFn(k)}
                style={QuestionAnswerStyle.questionOptions}
              >
                <Text style={QuestionAnswerStyle.optionsText}>{k}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <View style={{ bottom: 200, alignItems: "center" }}>
          <ButtonGradient
            title="Next"
            clickHandler={() =>
              this.submitAnswer(
                id,
                this.props.questions.result[questionIndex].question,
                this.props.questions.result[questionIndex].queId,
                this.state.selectedOption
              )
            }
            color1={Colors.commonButtonGradient1}
            color2={Colors.commonButtonGradient2}
            buttonStyle={QuestionAnswerStyle.nextButton}
            buttonTextStyle={QuestionAnswerStyle.exitButtonText}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.ClubReducer.questions,
    selectedGame: state.ClubReducer.selectedGame,
    userData: state.ClubReducer.userData
  };
};

export default connect(
  mapStateToProps,
  null
)(QuestionAnswer);