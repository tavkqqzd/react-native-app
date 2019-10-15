import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { NavigationActions } from "react-navigation";
import images from "../../Themes/Images";
import { connect } from "react-redux";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";
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

class InstructionPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({ header: null });
  state = {};

  getQuestions = gameId => {
    let { remainingQuestions, totalQuestions } = this.props.selectedGame;
    let questionIndex = "";
    if (remainingQuestions === totalQuestions || remainingQuestions === 0) {
      questionIndex = 0;
      this.props.getIndexOfQuestion(questionIndex);
    } else if (totalQuestions > remainingQuestions) {
      questionIndex = totalQuestions - remainingQuestions;
      this.props.getIndexOfQuestion(questionIndex);
    }
    getQuestions(gameId)
      .then(res => {
        console.log("getQuestions", res.data);
        if (res.status === 200) {
          this.props.getQuestions(res.data);
          this.props.navigation.dispatch(QuestionAnswerPage);
        } else if (res.status === 404) {
          // Toast.show(res.data.message, Toast.LONG, Toast.BOTTOM, invalidClub);
        } else if (res.status === 500) {
          // Toast.show("Server Error", Toast.LONG, Toast.BOTTOM, errorToast);
        }
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  render() {
    let { id, instruction } = this.props.selectedGame;
    console.log("this.props.selectedGame instruction page", this.props.selectedGame);
    return (
      <View style={InstructionStyle.instructionIntent}>
        <View>
          <Image source={images.small_logo} />
        </View>
        <View style={InstructionStyle.CP_banner}>
          <Text style={InstructionStyle.CP_banner2}>
            Club Passport is your ticket to all the Fun that is available at your Club...
          </Text>
        </View>
        <View style={InstructionStyle.gameInstructionAlignment}>
          <Text style={InstructionStyle.gameInstructionText}>Instruction for game</Text>
        </View>
        <View>
          <Text style={InstructionStyle.gameInstruction}>{instruction}</Text>
        </View>
        <View style={InstructionStyle.buttonAlignment}>
          <ButtonGradient
            title="Enter The Game"
            clickHandler={() => this.getQuestions(id)}
            color1={Colors.commonButtonGradient1}
            color2={Colors.commonButtonGradient2}
            buttonStyle={css.startButton}
            buttonTextStyle={css.buttonTextStyle}
          />
        </View>
      </View>
    );
  }
}

const css = StyleSheet.create({
  buttonTextStyle: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: "bold",
    fontFamily: Fonts.Fonts.CA_book
  },
  startButton: {
    height: 50,
    width: widthPercentageToDP("80%"),
    borderRadius: 30
  }
});

const mapStateToProps = state => {
  return {
    userLoginData: state.ClubReducer.userData,
    gameData: state.ClubReducer.gameData,
    selectedGame: state.ClubReducer.selectedGame
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClubData: data => dispatch(actions.getClubData(data)),
    getQuestions: data => dispatch(actions.getQuestions(data)),
    getIndexOfQuestion: index => dispatch(actions.indexOfQuestion(index))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructionPage);
