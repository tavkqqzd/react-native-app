import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { randomColorGenerator } from "../Utils/RandomColorGenerator";
import colors from "../../Themes/Colors";
import { widthPercentageToDP } from "../Utils/PercentageToPixels";
import Fonts from "../../Themes/Fonts";

class DashboardCard extends React.Component {
  gameStatusDisplay = () => {
    let { totalQuestions, totalQuestionsAnswered, remainingQuestions } = this.props.gameData;
    if (totalQuestions === totalQuestionsAnswered) {
      return "Restart";
    } else if (totalQuestions === remainingQuestions) {
      return "Start Now";
    } else if (remainingQuestions < totalQuestions) {
      return "Resume";
    }
  };

  render() {
    let { gameName, totalQuestions, onClickHandler } = this.props;
    return (
      <LinearGradient
        useAngle={true}
        angle={90}
        colors={[randomColorGenerator(), randomColorGenerator()]}
        style={css.card}
      >
        {/* <View> */}
        <View style={css.gameName}>
          <Text style={css.gameNameText}>{gameName}</Text>
        </View>
        <View style={css.cardBottomRow}>
          <View style={css.questionSection}>
            <Text style={css.questionsText}>{totalQuestions} Questions</Text>
          </View>
          <View style={css.bottomButtonSection}>
            <TouchableOpacity style={css.button} onPress={onClickHandler}>
              <Text style={css.questionsText}>{this.gameStatusDisplay()}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </View> */}
      </LinearGradient>
    );
  }
}

const css = StyleSheet.create({
  card: {
    borderRadius: 10,
    height: 120,
    marginTop: 10,
    marginBottom: 10
  },
  cardBottomRow: {
    flexDirection: "row"
  },
  button: {
    borderRadius: 15,
    marginLeft: 10,
    padding: 10,
    borderColor: colors.white,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: 90
  },
  gameName: { height: 60, padding: 10 },
  gameNameText: { fontSize: 24, color: colors.white, fontFamily: Fonts.Fonts.CA_bold },
  questionsText: { fontSize: 18, color: colors.white, fontFamily: Fonts.Fonts.CA_bold },
  cardBottomRow: { height: 60, flexDirection: "row", padding: 10 },
  questionSection: { width: widthPercentageToDP("40%"), justifyContent: "flex-end" },
  bottomButtonSection: { width: widthPercentageToDP("50%"), flexDirection: "row", justifyContent: "flex-end" },
  headerText: { textAlign: "center" }
});

export default DashboardCard;
